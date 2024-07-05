import {defineType, defineField, Rule} from 'sanity'

export const frontpage = defineType({
  name: 'frontpage',
  title: 'Forside',
  type: 'document',
  groups: [
    {title: 'Innhold', name: 'content'},
    {title: 'Standard visning', name: 'default'},
    {title: 'SEO', name: 'seo'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
      group: 'content',
      validation: (rule) => [
        rule.max(100).warning('Anbefaler kortere tittel.'),
        rule.required().min(1).error('Tittel er påkrevd'),
      ],
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'customImage',
      group: 'content',
      validation: (rule) => [rule.required()],
    }),
    defineField({
      name: 'text',
      title: 'Tekst',
      type: 'content',
      group: 'default',
      validation: (rule: Rule) =>
        rule.custom((text, context) => {
          const event = context.document?.event
          if (!event && !text) {
            return 'Tekst er påkrevd når Forestilling ikke er valgt'
          }
          return true
        }),
    }),
    defineField({
      name: 'event',
      title: 'Forestilling',
      type: 'reference',
      to: [{type: 'event'}],
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
