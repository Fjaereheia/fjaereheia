import {StructureBuilder} from 'sanity/structure'
import {CalendarIcon, DocumentTextIcon, HomeIcon, UserIcon, InfoOutlineIcon} from '@sanity/icons'

const SINGLETONS = [
  {id: 'frontpage', title: 'Forside', _type: 'frontpage', icon: HomeIcon, schemaType: 'frontpage'},
  {
    id: 'infopage',
    title: 'Informasjonsside',
    _type: 'document',
    icon: InfoOutlineIcon,
    schemaType: 'infopage',
  },
]

const LANGUAGES = [
  {id: `nb`, title: `🇳🇴 Norwegian (Bokmål)`},
  {id: `en`, title: `🇬🇧 English`},
]

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Innhold')
    .items([
      ...SINGLETONS.map((singleton) =>
        S.listItem()
          .title(singleton.title)
          .id(singleton.id)
          .icon(singleton.icon)
          .child(
            S.list()
              .title(singleton.title)
              .id(singleton.id)

              .items(
                LANGUAGES.map((language) =>
                  S.documentListItem()
                    .schemaType(singleton.schemaType)
                    .id(`${singleton.id}-${language.id}`)
                    .title(`${singleton.title} (${language.id.toLocaleUpperCase()})`),
                ),
              )
              .canHandleIntent(
                (intentName, params) => intentName === 'edit' && params.id.startsWith(singleton.id),
              ),
          ),
      ),
      S.divider(),
      S.documentTypeListItem('article').title('Artikler').icon(DocumentTextIcon),
      S.documentTypeListItem('event').title('Forestillinger').icon(CalendarIcon),
      S.documentTypeListItem('role').title('Roller').icon(UserIcon),
    ])
