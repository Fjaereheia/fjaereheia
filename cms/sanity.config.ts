import {defineConfig} from 'sanity'
import {StructureBuilder, StructureResolverContext, structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {BlockquoteIcon, CalendarIcon, DocumentTextIcon, HomeIcon} from '@sanity/icons'

//singleton pages. Before you add the type to singletontypes, the page should be created, since create is not a valid action for singleton types
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])
const singletonTypes = new Set(['frontpage'])

const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Innhold')
    .items([
      S.listItem()
        .title('Forside')
        .id('frontpage')
        .child(S.document().schemaType('frontpage').documentId('frontpage'))
        .icon(HomeIcon),
      S.documentTypeListItem('article').title('Artikler').icon(DocumentTextIcon),
      S.documentTypeListItem('event').title('Forestillinger').icon(CalendarIcon),
      S.documentTypeListItem('quote').title('Sitat').icon(BlockquoteIcon),
    ])

export default defineConfig({
  name: 'default',
  title: 'Fjæreheia',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '0chpibsu',
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',

  plugins: [structureTool({structure: deskStructure}), visionTool()],

  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },
  document: {
    // filter out actions that should not be available for singleton pages
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({action}) => action && singletonActions.has(action))
        : input,
  },
})
