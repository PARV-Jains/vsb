// {
//   "root": true,
//   "project": {
//     "name": "vsbweb"
//   },
//   "api": {
//     "projectId": "yk298a5e",
//     "dataset": "production"
//   },
//   "plugins": [
//     "@sanity/default-layout",
//     "@sanity/desk-tool",
//     "pdf-generator",
//     "order-documents",
//     "@sanity/orderable-document-list",
//     "vercel-deploy",
//     "@sanity/dashboard",
//     "onesignal"
//   ],
//   "env": {
//     "development": {
//       "plugins": [
//         "@sanity/vision"
//       ]
//     }
//   },
//   "parts": [
//     {
//       "name": "part:@sanity/base/schema",
//       "path": "./schemas/schema"
//     },
//     {
//       "implements": "part:@sanity/base/app-loading-screen",
//       "path": "./components/loading.js"
//     },
//     {
//       "implements": "part:@sanity/base/theme/variables/override-style",
//       "path": "./styles/variable.css"
//     },
//     {
//       "implements": "part:@sanity/base/brand-logo",
//       "path": "./components/myLogo.js"
//     }
//   ]
// }

// sanity.config.js
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import Logo  from './sanityComponents/Logo';
import StudioNavbar  from './sanityComponents/StudioNavbar.tsx';
import { myTheme } from './theme';

export default defineConfig({
  basePath: '/studio',
  name: 'vsbweb',
  
  title: 'VSB admin',
  projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET,
  plugins: [deskTool(), visionTool()],
  // tools: (prev) => {
  //   // 👇 Uses environment variables set by Vite in development mode
  //   if (import.meta.env.DEV) {
  //     return prev
  //   }
  //   return prev.filter((tool) => tool.name !== 'vision')
  // },
  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {
      logo: Logo,
      navbar: StudioNavbar,
    },
  },
  theme: myTheme,
});
