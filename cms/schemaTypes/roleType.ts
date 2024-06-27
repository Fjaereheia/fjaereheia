import {defineField, defineType} from 'sanity'

export const roleType = defineType({
  name: 'role',
  title: 'Rolle',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(50).error(`Må ha navn på minst 2 bokstaver`),
    }),
    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      description: 'Legg til et bilde',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Biografi',
      description: 'Hold det kort',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
  ],
})
