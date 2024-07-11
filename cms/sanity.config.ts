import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {defineDocuments, presentationTool} from 'sanity/presentation'
import {schemaTypes} from './schemaTypes'
import {DocumentTextIcon} from '@sanity/icons'
import {
  documentInternationalization,
  DeleteTranslationAction,
} from '@sanity/document-internationalization'
import {deskStructure} from './structure'
import {PluginConfig} from './structure/documentInternationalization'
import {muxInput} from 'sanity-plugin-mux-input'

//singleton pages. Before you add the type to singletontypes, the page should be created, since create is not a valid action for singleton types
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])
const singletonTypes = new Set(['frontpage'])
const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

export default defineConfig({
  name: 'default',
  title: 'Fjæreheia',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '0chpibsu',
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',

  plugins: [
    documentInternationalization(PluginConfig),
    presentationTool({
      icon: DocumentTextIcon,
      previewUrl: SANITY_STUDIO_PREVIEW_URL,
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
    structureTool({structure: deskStructure}),
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
