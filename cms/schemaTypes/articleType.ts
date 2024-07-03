import {defineField, defineType} from 'sanity'
import {isUniqueOtherThanLanguage} from '../structure/documentInternationalization'

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
    }),
    defineField({
      name: 'text',
      title: 'Tekst',
      type: 'content',
      description: 'Innhold',
    }),
    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'customImage',
      description: 'Legg til et bilde',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'mux.video',
      description: 'Legg til en video',
    }),
    defineField({
      name: 'event',
      type: 'reference',
      to: [{type: 'event'}],
      description: 'Arrangement',
    }),
  ],
})
