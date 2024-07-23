export default {
  name: 'content',
  type: 'array',
  title: 'Content',
  of: [
    {
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'h1', value: 'h1'},
        {title: 'h2', value: 'h2'},
        {title: 'h3', value: 'h3'},
        {title: 'h4', value: 'h4'},
      ],
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
    {
      type: 'review',
    },
  ],
}
