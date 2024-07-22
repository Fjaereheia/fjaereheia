import {defineField, defineType} from 'sanity'
import {isUniqueOtherThanLanguage} from '../structure/documentInternationalization'

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
      name: 'colorCombinationsDay',
      title: 'Fargekombinasjon',
      type: 'colorCombinationsDay',
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
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'video',
      description: 'Legg til en video',
    }),
    defineField({
      name: 'event',
      type: 'reference',
      to: [{type: 'event'}],
      options: {
        filter: ({document}) => {
          return {
            filter: 'language == $lang',
            params: {lang: document.language},
          }
        },
      },
      description: 'Arrangement',
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
