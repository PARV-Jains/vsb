import sanityClient from '@sanity/client';
import config from './config';
const client = sanityClient({
  projectId: config.projectId,
  dataset: config.dataset,
  useCdn: true,
   apiVersion: '2022-05-30',
  tokenWithWriteAccess: process.env.SANITY_AUTH_TOKEN
});
export default client;