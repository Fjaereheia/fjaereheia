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
      name: 'links',
      title: 'Forestillinger',
      description: 'Velg forestillinger som skal vises på programsiden',
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
      options: {
        documentInternationalization: {
          exclude: true,
        },
      },
    }),
    defineField({
      name: 'gif',
      title: 'GIF',
      type: 'customImage',
      description: 'GIF som ligger bak listen med forestillinger',
      options: {
        accept: '.gif',
      },
    }),
  ],
})
