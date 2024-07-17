import {defineType, defineField} from 'sanity'

export const programpage = defineType({
  name: 'programpage',
  title: 'Programside',
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
          to: [{type: 'event'}, {type: 'programpage'}],
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
