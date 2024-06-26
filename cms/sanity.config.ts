import {defineConfig, defineField} from 'sanity'
import {StructureBuilder, StructureResolverContext, structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {HomeIcon, DocumentTextIcon, CalendarIcon, UserIcon} from '@sanity/icons'
import {
  documentInternationalization,
  DeleteTranslationAction,
} from '@sanity/document-internationalization'
import {isUniqueOtherThanLanguage} from './helperFunctions'

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
      S.documentTypeListItem('role').title('Roller').icon(UserIcon),
    ])

export default defineConfig({
  name: 'default',
  title: 'Fjæreheia',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '0chpibsu',
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',

  plugins: [
    documentInternationalization({
      supportedLanguages: [
        {id: 'nb', title: '🇳🇴 Norwegian (Bokmål)'},
        {id: 'en', title: '🇬🇧 English'},
      ],
      schemaTypes: ['article', 'event'],
      metadataFields: [
        defineField({
          name: 'slug',
          type: 'slug',
          options: {
            isUnique: isUniqueOtherThanLanguage,
          },
        }),
      ],
    }),
    structureTool({structure: deskStructure}),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
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
