import { Rule } from '@sanity/types';

const categorySchema = {
  name: 'category',
  type: 'document',
  title: 'Category',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Category Title',
      validation: (Rule: Rule) => Rule.required().error('Category title is required'),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (Rule: Rule) =>
        Rule.max(200).warning('Shorter descriptions are better.'),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .slice(0, 200),
      },
      validation: (Rule: Rule) => Rule.required().error('Slug is required'),
    },
  ],
};

export default categorySchema;
