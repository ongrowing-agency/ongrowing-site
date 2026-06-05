import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

export async function getCourses() {
  return sanityClient.fetch(`
    *[_type == "course"] | order(_createdAt desc) {
      _id, title, slug, description, thumbnail, category, level, duration,
      "lessonCount": count(modules[].lessons[])
    }
  `);
}

export async function getCourse(slug: string) {
  return sanityClient.fetch(`
    *[_type == "course" && slug.current == $slug][0] {
      _id, title, slug, description, fullDescription, thumbnail,
      category, level, duration, modules
    }
  `, { slug });
}

export async function getPosts() {
  return sanityClient.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, excerpt, publishedAt, categories,
      cover { asset-> },
      "readTime": round(length(pt::text(body)) / 5 / 180)
    }
  `);
}

export async function getPost(slug: string) {
  return sanityClient.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, excerpt, body, publishedAt, categories,
      cover { asset-> }
    }
  `, { slug });
}

export async function getRecentPosts(limit = 4) {
  return sanityClient.fetch(`
    *[_type == "post"] | order(publishedAt desc) [0...$limit] {
      _id, title, slug, categories,
      "readTime": round(length(pt::text(body)) / 5 / 180)
    }
  `, { limit });
}

export async function getLegalPage(slug: string) {
  return sanityClient.fetch(`
    *[_type == "legalPage" && slug.current == $slug][0] {
      _id, title, body, updatedAt
    }
  `, { slug });
}