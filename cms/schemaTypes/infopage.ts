import {defineType, defineField} from 'sanity'

export const infopage = defineType({
  name: 'infopage',
  title: 'Informasjonsside',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (rule) => [
        rule.max(100).warning('Anbefaler kortere tittel.'),
        rule.required().min(1).error('Tittel er påkrevd'),
      ],
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'links',
      title: 'Undersider',
      type: 'array',
      description: 'Velg hvilke undersider, av typen Artikler, som skal vises på Informasjonssiden',
      of: [
        {
          type: 'reference',
          to: [{type: 'article'}],
          options: {
            filter: ({document}) => {
              return {
                filter: 'language == $lang',
                params: {lang: document.language},
              }
            },
          },
        },
      ],
    }),
  ],
})
