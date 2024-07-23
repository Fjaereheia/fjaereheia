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
      name: 'gif',
      title: 'GIF',
      type: 'customImage',
      description: 'GIF som ligger bak programmet',
    }),
    defineField({
      name: 'links',
      title: 'Forestillinger',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'event'}],
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
