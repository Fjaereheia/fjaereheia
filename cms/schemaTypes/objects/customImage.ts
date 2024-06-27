import {defineField} from 'sanity'

export default {
  name: 'customImage',
  title: 'Bilde',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      title: 'Alternativ Tekst',
      name: 'alt',
      type: 'string',
      validation: (rule) => [rule.required().min(1).error('Bildetekst er påkrevd')],
    }),
  ],
}
