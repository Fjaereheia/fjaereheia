import {defineField} from 'sanity'
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
      name: 'persons',
      title: 'Roller',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'person',
              title: 'Person',
              type: 'reference',
              to: [{type: 'person'}],
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
              name: 'occupation',
              title: 'Stilling',
              description: 'Legg til stilling',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'person.name',
              subtitle: 'occupation',
            },
          },
        },
      ],
    }),
  ],
}
