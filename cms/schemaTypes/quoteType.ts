import {defineField, defineType} from 'sanity'

export const quoteType = defineType({
  name: 'quote',
  title: 'Sitat',
  type: 'document',
  fields: [
    defineField({
      name: 'content',
      type: 'text',
      title: 'Innhold',
      validation: (rule) => [
        rule
          .required()
          .min(2)
          .error(`Innhold er påkrevd for å poste et sitat, minimum lengde på 2 tegn`),
        rule.required().max(100).warning(`Anbefaler kortere innhold.`),
      ],
    }),
    defineField({
      name: 'author',
      type: 'string',
      title: 'Forfatter',
      validation: (rule) => [
        rule
          .required()
          .min(2)
          .error(`Forfatter er påkrevd for å poste et sitat, minimum lengde på 2 tegn`),
      ],
    }),
    defineField({
      name: 'company',
      type: 'string',
      title: 'Selskap',
      placeholder: 'e.g. Aftenposten',
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      title: 'Dato for sitat',
    }),
  ],
})
