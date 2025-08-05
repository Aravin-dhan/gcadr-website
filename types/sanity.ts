export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface SanityFile {
  _type: 'file'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export interface Slug {
  _type: 'slug'
  current: string
}

export interface PortableTextBlock {
  _type: 'block'
  _key: string
  style?: string
  children: Array<{
    _type: 'span'
    _key: string
    text: string
    marks?: string[]
  }>
  markDefs?: Array<{
    _type: string
    _key: string
    [key: string]: any
  }>
}

export interface Author {
  _id: string
  _type: 'author'
  name: string
  slug: Slug
  image?: SanityImage
  bio?: PortableTextBlock[]
}

export interface Category {
  _id: string
  _type: 'category'
  title: string
  slug: Slug
  description?: string
}

export interface Post {
  _id: string
  _type: 'post'
  title: string
  slug: Slug
  excerpt?: string
  body: PortableTextBlock[]
  publishedAt: string
  author: Author
  categories: Category[]
  mainImage?: SanityImage
  estimatedReadingTime?: number
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
  }
}

export interface Event {
  _id: string
  _type: 'event'
  title: string
  slug: Slug
  description: string
  body?: PortableTextBlock[]
  dateTime: string
  location: string
  image?: SanityImage
  registrationRequired: boolean
  registrationLink?: string
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
  }
}

export interface TeamMember {
  _id: string
  _type: 'teamMember'
  name: string
  position: string
  bio?: PortableTextBlock[]
  image?: SanityImage
  email?: string
  linkedIn?: string
  order: number
}

export interface Publication {
  _id: string
  _type: 'publication'
  title: string
  authors: string[]
  abstract?: string
  publishedAt: string
  journal?: string
  volume?: string
  issue?: string
  pages?: string
  doi?: string
  pdfFile?: SanityFile
}

export interface GalleryImage {
  _id: string
  _type: 'galleryImage'
  title: string
  image: SanityImage
  category: string
  description?: string
  order: number
}

export interface HomePage {
  _id: string
  _type: 'homePage'
  hero: {
    title: string
    subtitle: string
    description: string
    ctaText: string
    ctaLink: string
    backgroundImage?: SanityImage
  }
  aboutPreview: {
    title: string
    description: string
    features: Array<{
      title: string
      description: string
      icon: string
    }>
  }
  featuredContent: {
    featuredPosts: Post[]
    featuredEvents: Event[]
  }
}
