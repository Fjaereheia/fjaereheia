import {defineField, defineType} from 'sanity'

export const muxVideo = defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  description: 'Legg til en video',
  fields: [
    defineField({
      name: 'muxVideo',
      type: 'mux.video',
      title: 'Mux Video',
      description: 'Velg en video fra Mux',
    }),
  ],
})
