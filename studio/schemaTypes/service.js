export default {
  name: 'service',
  type: 'document',
  title: 'Services & Prices',
  fields: [
    {
      name: 'titleEn',
      type: 'string',
      title: 'Service Title (English)',
      validation: Rule => Rule.required()
    },
    {
      name: 'titleNl',
      type: 'string',
      title: 'Service Title (Dutch)',
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price (€)',
      validation: Rule => Rule.required()
    },
    {
      name: 'descriptionEn',
      type: 'text',
      title: 'Description (English)',
    },
    {
      name: 'descriptionNl',
      type: 'text',
      title: 'Description (Dutch)',
    }
  ],
  preview: {
    select: {
      title: 'titleEn',
      subtitle: 'price'
    },
    prepare({ title, subtitle }) {
      return {
        title: title,
        subtitle: `€${subtitle}`
      }
    }
  }
}
