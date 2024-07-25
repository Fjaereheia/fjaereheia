import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export const roleType = defineType({
  name: 'role',
  title: 'Rolle',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(50).error(`Må ha navn på minst 2 bokstaver`),
    }),
    defineField({
      name: 'occupation',
      title: 'Stillingstittel',
      placeholder: 'e.g. Skuespiller',
      type: 'string',
      validation: (rule) =>
        rule
          .required()
          .min(2)
          .max(100)
          .error(`Stillingstittel er påkrevd for å legge til en rolle, minimum lengde på 2 tegn.`),
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
      description: 'Legg til et bilde',
      validation: (rule) => rule.required(),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'text',
      title: 'Biografi',
      description: 'Hold det kort',
      type: 'string',
    }),
  ],
})
