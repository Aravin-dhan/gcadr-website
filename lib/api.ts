// API service with caching, error handling, and performance optimization

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number; ttl: number }>()

interface ApiOptions {
  cache?: boolean
  cacheTTL?: number // Time to live in milliseconds
  timeout?: number
}

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public statusText?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Cache utilities
function getCacheKey(url: string, params?: Record<string, any>): string {
  const paramString = params ? new URLSearchParams(params).toString() : ''
  return `${url}${paramString ? `?${paramString}` : ''}`
}

function getFromCache(key: string) {
  const cached = cache.get(key)
  if (!cached) return null
  
  if (Date.now() - cached.timestamp > cached.ttl) {
    cache.delete(key)
    return null
  }
  
  return cached.data
}

function setCache(key: string, data: any, ttl: number) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl
  })
}

// Main API function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit & ApiOptions = {}
): Promise<T> {
  const {
    cache: useCache = true,
    cacheTTL = 5 * 60 * 1000, // 5 minutes default
    timeout = 10000,
    ...fetchOptions
  } = options

  const url = `${API_BASE_URL}${endpoint}`
  const cacheKey = getCacheKey(url, fetchOptions.method === 'GET' ? undefined : undefined)

  // Check cache for GET requests
  if (fetchOptions.method !== 'POST' && useCache) {
    const cached = getFromCache(cacheKey)
    if (cached) {
      return cached
    }
  }

  // Create abort controller for timeout
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new ApiError(
        `API request failed: ${response.statusText}`,
        response.status,
        response.statusText
      )
    }

    const data = await response.json()

    // Cache successful GET requests
    if (fetchOptions.method !== 'POST' && useCache) {
      setCache(cacheKey, data, cacheTTL)
    }

    return data
  } catch (error) {
    clearTimeout(timeoutId)
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiError('Request timeout')
      }
      throw new ApiError(error.message)
    }
    
    throw new ApiError('Unknown error occurred')
  }
}

// API endpoints
export const api = {
  // Blog endpoints
  blogs: {
    list: (params?: { featured?: boolean; category?: string }) =>
      apiRequest<any>('/api/blogs/', { method: 'GET' }),
    
    detail: (slug: string) =>
      apiRequest<any>(`/api/blogs/${slug}/`, { method: 'GET' }),
  },

  // Event endpoints
  events: {
    list: (params?: { featured?: boolean; type?: string; upcoming?: boolean }) =>
      apiRequest<any>('/api/events/', { method: 'GET' }),
    
    detail: (slug: string) =>
      apiRequest<any>(`/api/events/${slug}/`, { method: 'GET' }),
  },

  // Gallery endpoints
  galleries: {
    list: () =>
      apiRequest<any>('/api/galleries/', { method: 'GET' }),
    
    detail: (slug: string) =>
      apiRequest<any>(`/api/galleries/${slug}/`, { method: 'GET' }),
  },

  // Team endpoints
  team: {
    list: () =>
      apiRequest<any>('/api/team/', { method: 'GET', cacheTTL: 10 * 60 * 1000 }), // 10 minutes cache
  },

  // Leadership endpoints
  leadership: {
    list: () =>
      apiRequest<any>('/api/leadership/', { method: 'GET', cacheTTL: 10 * 60 * 1000 }),
  },

  // Form submissions
  forms: {
    contact: (data: any) =>
      apiRequest<any>('/api/contact/submit/', {
        method: 'POST',
        body: JSON.stringify(data),
        cache: 'no-store',
      }),

    newsletter: (data: any) =>
      apiRequest<any>('/api/newsletter/signup/', {
        method: 'POST',
        body: JSON.stringify(data),
        cache: 'no-store',
      }),

    internship: (data: FormData) =>
      fetch(`${API_BASE_URL}/api/internship/apply/`, {
        method: 'POST',
        body: data, // FormData for file uploads
      }).then(async (response) => {
        if (!response.ok) {
          throw new ApiError(
            `Internship application failed: ${response.statusText}`,
            response.status,
            response.statusText
          )
        }
        return response.json()
      }),

    submission: (data: any) =>
      apiRequest<any>('/api/submissions/submit/', {
        method: 'POST',
        body: JSON.stringify(data),
        cache: 'no-store',
      }),
  },

  // Utility endpoints
  featured: () =>
    apiRequest<any>('/api/featured/', { method: 'GET', cacheTTL: 2 * 60 * 1000 }), // 2 minutes cache

  search: (query: string) =>
    apiRequest<any>(`/api/search/?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      cache: 'no-store', // Don't cache search results
    }),
}

// Error handling utility
export function handleApiError(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message
  }
  
  if (error instanceof Error) {
    return error.message
  }
  
  return 'An unexpected error occurred'
}

// Cache management
export const cacheManager = {
  clear: () => cache.clear(),
  delete: (key: string) => cache.delete(key),
  size: () => cache.size,
}

export { ApiError }

// Legacy export for backward compatibility
export const apiService = {
  getTeamMembers: () => api.team.list(),
  getBlogPosts: (params?: any) => api.blogs.list(params),
  getJournalArticles: () => api.journals.list(),
  submitContact: (data: any) => api.contact.submit(data),
  submitInternship: (data: any) => api.internship.submit(data),
  submitNewsletter: (data: any) => api.newsletter.submit(data),
}
