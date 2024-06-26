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
            `Tittel er påkrevd for å poste en artikkel, minimum lengde på 2 og maksimum lengde på 50 tegn`,
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
    defineField({
      name: 'Bilde',
      type: 'image',
      description: 'Legg til et bilde',
    }),
  ],
})
