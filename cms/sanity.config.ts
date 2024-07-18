import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {
  documentInternationalization,
  DeleteTranslationAction,
} from '@sanity/document-internationalization'
import {deskStructure} from './structure'
import {PluginConfig} from './structure/documentInternationalization'
import {muxInput} from 'sanity-plugin-mux-input'
import {defineDocuments, presentationTool} from 'sanity/presentation'

//singleton pages. Before you add the type to singletontypes, the page should be created, since create is not a valid action for singleton types
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])
const singletonTypes = new Set(['frontpage'])

export default defineConfig({
  name: 'default',
  title: 'Fjæreheia',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '0chpibsu',
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',

  plugins: [
    documentInternationalization(PluginConfig),
    structureTool({structure: deskStructure}),
    presentationTool({
      previewUrl: process.env.SANITY_STUDIO_PREVIEW_URL ?? 'http://localhost:3333',
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: '',
            filter: `_type == "frontpage"`,
          },
          {
            route: '/event',
            filter: `_type == "event"`,
          },
          {
            route: 'event/:slug',
            filter: `_type == "event" && slug.current == $slug`,
          },
          {
            route: '/artikler',
            filter: `_type == "article"`,
          },
          {
            route: '/info',
            filter: `_type == "infopage`,
          },
        ]),
      },
    }),
    visionTool(),
    muxInput(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) => {
      return templates
        .filter(({schemaType}) => !singletonTypes.has(schemaType))
        .filter((template) => !['article', 'event', 'role'].includes(template.id))
    },
  },
  document: {
    actions: (input, context) => {
      // add the delete translation action to all documents
      input.push(DeleteTranslationAction)

      // filter out actions that should not be available for singleton pages
      return singletonTypes.has(context.schemaType)
        ? input.filter(({action}) => action && singletonActions.has(action))
        : input
    },
  },
})
