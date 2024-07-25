import {defineField, validation} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export default {
  name: 'roleGroups',
  title: 'Rolle Grupper',
  type: 'object',
  icon: UsersIcon,
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
          type: 'object',
          fields: [
            {
              name: 'role',
              title: 'Rolle',
              type: 'reference',
              to: [{type: 'role'}],
              options: {
                filter: ({document}) => {
                  return {
                    filter: 'language == $lang',
                    params: {lang: document.language},
                  }
                },
              },
            },
            {
              name: 'roleTitle',
              title: 'RolleTittel',
              description: 'Legg til stilling',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'role.name', // This selects the `name` field from the referenced `role` document
              subtitle: 'roleTitle', // Optionally, show the `roleTitle` as a subtitle
            },
          },
        },
      ],
    }),
  ],
}
