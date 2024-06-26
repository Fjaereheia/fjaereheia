import {defineField, defineType} from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Forestilling',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (rule) => [
        rule
          .required()
          .min(2)
          .error(`Tittel er påkrevd for å poste et arrangement, minimum lengde på 2 tegn.`),
        rule.max(100).warning('Anbefaler kortere tittel.'),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'slug',
      type: 'slug',
      options: {source: 'tittel'},
      hidden: ({document}) => !document?.tittel,
      description: 'Url: fjaereheia.no/xxx',
    }),
    defineField({
      name: 'preamble',
      title: 'Ingress',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      validation: (rule) => [rule.required()],
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Bildetekst',
          validation: (rule) => [rule.required().min(1).error('Bildetekst er påkrevd')],
        },
      ],
    }),
    defineField({
      name: 'alt',
      title: 'beskrivelse',
      type: 'array',
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
