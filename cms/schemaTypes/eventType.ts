import {defineField, defineType} from 'sanity'
import {isUniqueOtherThanLanguage} from '../helperFunctions'

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
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'slug',
      title: 'slug',
      type: 'slug',
      options: {source: 'title', isUnique: isUniqueOtherThanLanguage},
      hidden: ({document}) => !document?.title,
      description: 'Url: fjaereheia.no/xxx',
    }),
    defineField({
      name: 'preamble',
      title: 'Ingress',
      type: 'string',
    }),
    defineField({
      name: 'dates',
      title: 'Datoer',
      type: 'array',
      of: [{type: 'datetime'}],
      validation: (rule) => [rule.required().min(1).error('Minst en dato er påkrevd.')],
    }),
    defineField({
      name: 'duration',
      title: 'Varighet',
      type: 'string',
      placeholder: 'e.g 1 time og 30 minutter',
      validation: (rule) => [rule.required().error('Varighet er påkrevd.')],
    }),
    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'customImage',
    }),
    defineField({
      name: 'text',
      title: 'beskrivelse',
      type: 'content',
    }),
    defineField({
      name: 'TicketsUrl',
      title: 'Billettlenke',
      description: 'Lenke til salg av billetter (ticketmaster.no/xxx)',
      type: 'url',
    }),
  ],
})
