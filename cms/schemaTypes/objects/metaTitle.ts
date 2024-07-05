import {defineType} from 'sanity'

export default defineType({
  name: 'metaTitle',
  title: 'SEO tittel',
  description: 'Tittel for metadata',
  type: 'string',
  validation: (rule) => [rule.required(), rule.max(70).warning('Maksimalt 70 tegn')],
})
