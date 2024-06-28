import {defineField, defineType} from 'sanity'

export const articleType = defineType({
  name: 'article',
  title: 'Artikkel',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (rule) =>
        rule
          .required()
          .min(2)
          .max(50)
          .error(
            `Tittel er påkrevd for å poste en artikkel, minimum lengde på 2 og maksimum lengde på 50 tegn`,
          ),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      hidden: ({document}) => !document?.title,
      description: 'Url: fjaereheia.no/xxx',
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
          type: 'image',
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      description: 'Legg til et bilde',
    }),
    defineField({
      name: 'event',
      type: 'reference',
      to: [{type: 'event'}],
      description: 'Arrangement',
    }),
  ],
})
