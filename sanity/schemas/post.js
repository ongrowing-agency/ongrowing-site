export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: R => R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: R => R.required() },
    { name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3, validation: R => R.required() },
    { name: 'cover', title: 'Cover Image', type: 'image', options: { hotspot: true } },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    },
    { name: 'publishedAt', title: 'Published At', type: 'datetime', validation: R => R.required() },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'Tráfego pago',
          'Automação & IA',
          'E-mail marketing',
          'Estratégia & funil',
          'Cases & bastidores',
          'Diagnóstico & dados',
        ],
      },
    },
    { name: 'author', title: 'Author', type: 'string', initialValue: 'Vini Santos' },
  ],
  orderings: [{ title: 'Published Date, New', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'publishedAt' } },
};
