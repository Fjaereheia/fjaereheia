import {defineField, defineType} from 'sanity'
import {isUniqueOtherThanLanguage} from '../helperFunctions'

export const articleType = defineType({
  name: 'article',
  title: 'Artikkel',
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
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', isUnique: isUniqueOtherThanLanguage},
      hidden: ({document}) => !document?.title,
      description: 'Url: fjaereheia.no/xxx',
      group: 'seo',
    }),
    defineField({
      name: 'text',
      title: 'Tekst',
      type: 'content',
      description: 'Innhold',
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'customImage',
      description: 'Legg til et bilde',
      group: 'content',
    }),
    defineField({
      name: 'event',
      type: 'reference',
      to: [{type: 'event'}],
      description: 'Arrangement',
      group: 'content',
    }),
    defineField({
      name: 'metaTitle',
      title: 'Tittel',
      description: 'Tittel for metadata',
      type: 'string',
      group: 'seo',
      validation: (rule) => [rule.required(), rule.max(70).warning('Maksimalt 70 tegn')],
    }),
    defineField({
      name: 'metaDescription',
      title: 'Beskrivelse',
      description: 'Kort sammendrag (maks 160 tegn)',
      type: 'string',
      group: 'seo',
      validation: (rule) => [rule.required(), rule.max(160).warning('Maksimalt 160 tegn')],
    }),
  ],
})
