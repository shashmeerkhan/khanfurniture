import { Rule } from '@sanity/types';
const productSchema= {
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule: Rule) => Rule.required().error('Name is required'),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .slice(0, 26),
      },
      validation: (Rule: Rule) => Rule.required().error('Slug is required'),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
      description: 'Upload an image of the product.',
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price',
      validation: (Rule: Rule) =>
        Rule.required().min(0).error('Price is required and must be positive'),
    },
    {
      name: 'description',
      type: 'array',
      title: 'Description',
      of: [{ type: 'block' }],
    },
    {
      name: 'discountPercentage',
      type: 'number',
      title: 'Discount Percentage',
      validation: (Rule: Rule) =>
        Rule.min(0).max(100).warning('Discount must be between 0 and 100.'),
    },
    {
      name: 'isFeaturedProduct',
      type: 'boolean',
      title: 'Is Featured Product',
    },
    {
      name: 'featuredOrder',
      type: 'number',
      title: 'Featured Order',
      validation: (Rule: Rule) => Rule.min(0).warning('Order must be non-negative'),
    },
    {
      name: 'stockLevel',
      type: 'number',
      title: 'Stock Level',
      validation: (Rule: Rule) =>
        Rule.min(0).error('Stock level must be a positive number.'),
    },
    {
      name: 'category',
      type: 'reference',
      to: [{ type: 'category' }],
      title: 'Category',
      validation: (Rule: Rule) => Rule.required().error('Category is required'),
    },
    {
      name: 'createdAt',
      type: 'datetime',
      title: 'Created At',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'updatedAt',
      type: 'datetime',
      title: 'Updated At',
      readOnly: true,
    },
  ],
};
export default productSchema