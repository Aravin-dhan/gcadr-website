import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// GROQ queries
export const queries = {
  // Home page
  homePageData: `*[_type == "homePage"][0]{
    hero,
    aboutPreview,
    featuredContent
  }`,
  
  // Blog posts
  allPosts: `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    author->,
    categories[]->,
    mainImage,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
  }`,
  
  postBySlug: `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    body,
    excerpt,
    publishedAt,
    author->,
    categories[]->,
    mainImage,
    seo
  }`,
  
  // Events
  upcomingEvents: `*[_type == "event" && dateTime > now()] | order(dateTime asc) {
    _id,
    title,
    slug,
    description,
    dateTime,
    location,
    image,
    registrationRequired,
    registrationLink
  }`,
  
  eventBySlug: `*[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    body,
    dateTime,
    location,
    image,
    registrationRequired,
    registrationLink,
    seo
  }`,
  
  // Team members
  teamMembers: `*[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    position,
    bio,
    image,
    email,
    linkedIn,
    order
  }`,
  
  // Publications
  publications: `*[_type == "publication"] | order(publishedAt desc) {
    _id,
    title,
    authors,
    abstract,
    publishedAt,
    journal,
    volume,
    issue,
    pages,
    doi,
    pdfFile
  }`,
  
  // Gallery
  galleryImages: `*[_type == "galleryImage"] | order(order asc) {
    _id,
    title,
    image,
    category,
    description,
    order
  }`,
}
