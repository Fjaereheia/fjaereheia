export default {
  name: 'content',
  type: 'array',
  title: 'Content',
  of: [
    {
      type: 'block',
    },
    {
      type: 'customImage',
    },
    {
      type: 'video',
    },
    {
      type: 'quote',
    },
  ],
}
