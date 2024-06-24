import {defineField, defineType} from 'sanity'

export const articleType = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'Title',
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
      options: {source: 'Title'},
      hidden: ({document}) => !document?.Title,
      description: 'Url: fjaereheia.no/xxx',
    }),
    defineField({
      name: 'Text',
      type: 'array',
      description: 'Article content',
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
