import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'jasonmcalpin',

  projectId: 'ya16r6hg',
  dataset: 'wordpressed',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})