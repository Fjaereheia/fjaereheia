import {defineField, defineType} from 'sanity'

export const articleType = defineType({
  name: 'article',
  title: 'Artikkel',
  type: 'document',
  fields: [
    defineField({
      name: 'Tittel',
      type: 'string',
      validation: (rule) =>
        rule
          .required()
          .min(2)
          .max(50)
          .error(
            `Required to post an atricle, minium length of 2 and maximum length of 50 character`,
          ),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'Tittel'},
      hidden: ({document}) => !document?.Tittel,
      description: 'Url: fjaereheia.no/xxx',
    }),
    defineField({
      name: 'Tekst',
      type: 'array',
      description: 'Innhold',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
        },
      ],
    }),
  ],
})
