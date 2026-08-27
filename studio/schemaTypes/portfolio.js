export default {
  name: 'portfolio',
  type: 'document',
  title: 'Portfolio Images',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title (Internal)',
      description: 'Used just to identify the image in the admin panel',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'order',
      type: 'number',
      title: 'Display Order',
      description: 'Lower numbers show first',
      initialValue: 0
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    }
  }
}
