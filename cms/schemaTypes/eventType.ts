import {defineField, defineType} from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'tittel',
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
      type: 'slug',
      options: {source: 'tittel'},
      hidden: ({document}) => !document?.tittel,
      description: 'Url: fjaereheia.no/xxx',
    }),
    defineField({
      name: 'ingress',
      type: 'string',
    }),
    defineField({
      name: 'bilde',
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
      name: 'beskrivelse',
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
