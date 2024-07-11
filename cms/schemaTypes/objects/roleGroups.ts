import {defineField, validation} from 'sanity'

export default {
  name: 'roleGroups',
  title: 'Rolle Grupper',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(50).error(`Må ha navn på minst 2 bokstaver`),
    }),
    defineField({
      name: 'roles',
      title: 'Roller',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'role'}],
        },
      ],
    }),
  ],
}
