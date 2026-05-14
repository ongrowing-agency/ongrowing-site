export default {
  name: 'legalPage',
  title: 'Legal Page',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: R => R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: R => R.required() },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    },
    { name: 'updatedAt', title: 'Updated At', type: 'datetime' },
  ],
};
