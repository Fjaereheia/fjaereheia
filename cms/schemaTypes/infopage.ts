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
      name: 'text',
      title: 'Tekst',
      type: 'array',
      description: 'Innhold',
      of: [
        {
          type: 'block',
        },
        {
          type: 'customImage',
        },
      ],
    }),
    defineField({
      name: 'links',
      title: 'Undersider',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'article'}, {type: 'infopage'}],
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
