// sanity.cli.js
import {defineCliConfig} from 'sanity/cli'

// const projectId = process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID;
// const dataset = process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET;

export default defineCliConfig({
  api: {
    projectId :"yk298a5e" , // replace value with your own
    dataset : "production" ,// replace value with your own
  }
})