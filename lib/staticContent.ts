// Static content loader for GCADR website
// This allows the frontend to work with or without a backend server

interface ApiResponse<T> {
  results: T[]
  count: number
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  published: boolean
  featured: boolean
  author_display_name: string
  category_name: string
  tags: Array<{ id: string; name: string }>
  featured_image?: string
  featured_image_url?: string
  created_at: string
}

interface TeamMember {
  id: string
  name: string
  role: string
  role_display: string
  batch: string
  email: string
  linkedin_url: string
  bio: string
  image?: string
  image_url?: string
  active: boolean
  order: number
}

interface Announcement {
  id: string
  title: string
  content: string
  announcement_type: 'news' | 'event' | 'deadline' | 'general'
  is_featured: boolean
  published_date: string
}

interface CarouselImage {
  id: string
  title: string
  description: string
  image: string
  image_url?: string
  link_url?: string
  title_color?: string
  show_title?: boolean
  is_active: boolean
  order: number
}

class StaticContentLoader {
  private baseUrl: string
  private fallbackToStatic: boolean

  constructor() {
    // Determine API base URL
    this.baseUrl = this.getApiBaseUrl()
    this.fallbackToStatic = false
  }

  private getApiBaseUrl(): string {
    // Check for environment variable first
    if (process.env.NEXT_PUBLIC_API_URL) {
      return process.env.NEXT_PUBLIC_API_URL
    }

    // Check if we're on Vercel and should use Render backend
    if (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
      return 'https://gcadr-website.onrender.com'
    }

    // Default to localhost for development
    return 'http://localhost:8000'
  }

  private async fetchWithFallback<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      // Try backend API first
      if (!this.fallbackToStatic) {
        const response = await fetch(`${this.baseUrl}/api/${endpoint}`)
        if (response.ok) {
          const data = await response.json()
          return Array.isArray(data) ? { results: data, count: data.length } : data
        }
      }

      // Fallback to static files
      console.log(`Falling back to static content for ${endpoint}`)
      const staticResponse = await fetch(`/api/${endpoint}.json`)
      if (staticResponse.ok) {
        return await staticResponse.json()
      }

      throw new Error(`Failed to load ${endpoint}`)
    } catch (error) {
      console.error(`Error loading ${endpoint}:`, error)
      
      // Mark for static fallback on future requests
      this.fallbackToStatic = true
      
      // Try static files if not already tried
      try {
        const staticResponse = await fetch(`/api/${endpoint}.json`)
        if (staticResponse.ok) {
          return await staticResponse.json()
        }
      } catch (staticError) {
        console.error(`Static fallback also failed for ${endpoint}:`, staticError)
      }

      // Return empty response as last resort
      return { results: [], count: 0 }
    }
  }

  async getBlogs(options: { featured?: boolean; category?: string; limit?: number } = {}): Promise<BlogPost[]> {
    let endpoint = 'blogs'
    const params = new URLSearchParams()
    
    if (options.featured) params.append('featured', 'true')
    if (options.category) params.append('category', options.category)
    if (options.limit) params.append('limit', options.limit.toString())
    
    if (params.toString()) {
      endpoint += `?${params.toString()}`
    }

    const response = await this.fetchWithFallback<BlogPost>(endpoint)
    return response.results
  }

  async getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
      // Try backend first
      if (!this.fallbackToStatic) {
        const response = await fetch(`${this.baseUrl}/api/blogs/${slug}/`)
        if (response.ok) {
          return await response.json()
        }
      }

      // Fallback to static file
      const staticResponse = await fetch(`/api/blogs/${slug}.json`)
      if (staticResponse.ok) {
        return await staticResponse.json()
      }

      return null
    } catch (error) {
      console.error(`Error loading blog post ${slug}:`, error)
      return null
    }
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    const response = await this.fetchWithFallback<TeamMember>('team')
    return response.results
  }

  async getLeadership(): Promise<TeamMember[]> {
    const response = await this.fetchWithFallback<TeamMember>('leadership')
    return response.results
  }

  async getAnnouncements(limit?: number): Promise<Announcement[]> {
    let endpoint = 'announcements'
    if (limit) {
      endpoint += `?limit=${limit}`
    }

    const response = await this.fetchWithFallback<Announcement>(endpoint)
    return response.results
  }

  async getCarouselImages(): Promise<CarouselImage[]> {
    const response = await this.fetchWithFallback<CarouselImage>('carousel')
    return response.results
  }

  // Utility method to get media URL
  getMediaUrl(path: string): string {
    if (!path) return ''
    
    // If it's already a full URL, return as-is
    if (path.startsWith('http')) return path
    
    // If it starts with /media/, use static files
    if (path.startsWith('/media/')) return path
    
    // Otherwise, construct media URL
    if (this.fallbackToStatic) {
      return `/media/${path}`
    } else {
      return `${this.baseUrl}/media/${path}`
    }
  }
}

// Create singleton instance
export const contentLoader = new StaticContentLoader()

// Export types for use in components
export type {
  BlogPost,
  TeamMember,
  Announcement,
  CarouselImage,
  ApiResponse
}
