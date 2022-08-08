import sanityClient from '@sanity/client';
import config from './config';
const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
   apiVersion: '2022-05-30',
  tokenWithWriteAccess: process.env.SANITY_AUTH_TOKEN
});
export default client;