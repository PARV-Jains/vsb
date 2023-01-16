// sanity.cli.js
import {defineCliConfig} from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET;

export default defineCliConfig({
  api: {
    projectId, // replace value with your own
    dataset// replace value with your own
  }
})