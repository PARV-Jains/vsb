import { createClient } from 'next-sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string;
export const dataset = process.env.NEXT_PUBLIC_SANITY_PROJECT_DATASET as string;
// export const tokenWithWriteAccess = process.env.SANITY_API_WRITE_TOKEN as string;
// const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

export const clients = createClient({
   projectId,
   dataset,
   apiVersion:'2022-05-30',
   useCdn: false,
});