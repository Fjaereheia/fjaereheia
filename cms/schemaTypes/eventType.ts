import {defineField, defineType} from 'sanity'
import {isUniqueOtherThanLanguage} from '../structure/documentInternationalization'

export const eventType = defineType({
  name: 'event',
  title: 'Forestilling',
  type: 'document',
  groups: [
    {title: 'Innhold', name: 'content'},
    {title: 'SEO', name: 'seo'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
      group: 'content',
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
      name: 'colorCombination',
      title: 'Fargekombinasjon',
      type: 'colorCombination',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'imageMask',
      title: 'Visning av bildet',
      type: 'imageMask',
    }),
    defineField({
      name: 'slug',
      title: 'slug',
      type: 'slug',
      options: {source: 'title', isUnique: isUniqueOtherThanLanguage},
      hidden: ({document}) => !document?.title,
      description: 'Url: fjaereheia.no/xxx',
      group: 'seo',
    }),
    defineField({
      name: 'preamble',
      title: 'Ingress',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'dates',
      title: 'Datoer',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'date',
              type: 'datetime',
              title: 'Dato',
              validation: (rule) => rule.required().error('Dato er påkrevd.'),
            },
            {
              name: 'url',
              type: 'url',
              title: 'Link',
              validation: (rule) => [rule.required().error('URL er påkrevd.')],
            },
          ],
        },
      ],
      validation: (rule) => [rule.required().min(1).error('Minst en dato er påkrevd.')],
    }),
    defineField({
      name: 'duration',
      title: 'Varighet',
      type: 'string',
      placeholder: 'e.g 1 time og 30 minutter',
      group: 'content',
      validation: (rule) => [rule.required().error('Varighet er påkrevd.')],
    }),
    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'customImage',
      group: 'content',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'text',
      title: 'beskrivelse',
      type: 'content',
      group: 'content',
    }),
    defineField({
      name: 'roleGroups',
      title: 'Roller',
      type: 'array',
      of: [{type: 'roleGroups'}],
      group: 'content',
    }),
    defineField({
      name: 'metaTitle',
      title: 'SEO tittel',
      type: 'metaTitle',
      group: 'seo',
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO beskrivelse',
      type: 'metaDescription',
      group: 'seo',
    }),
  ],
})
