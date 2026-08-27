import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'an0kf8qx', // Extracted from studio config
  dataset: 'production',
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2024-01-01', // date of setup
});

export async function getServices() {
  const query = `*[_type == "service"] | order(_createdAt asc) {
    _id,
    titleEn,
    titleNl,
    price,
    descriptionEn,
    descriptionNl
  }`;
  return sanityClient.fetch(query);
}

export async function getPortfolioImages() {
  const query = `*[_type == "portfolio"] | order(order asc) {
    _id,
    title,
    "imageUrl": image.asset->url
  }`;
  return sanityClient.fetch(query);
}
