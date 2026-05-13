export default {
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: R => R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: R => R.required() },
    { name: 'description', title: 'Short Description', type: 'text', rows: 3 },
    { name: 'thumbnail', title: 'Thumbnail', type: 'image', options: { hotspot: true } },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['Tráfego pago', 'Automação', 'Estratégia', 'E-mail'] },
      validation: R => R.required(),
    },
    {
      name: 'level',
      title: 'Level',
      type: 'string',
      options: { list: ['Iniciante', 'Intermediário', 'Avançado'] },
      validation: R => R.required(),
    },
    { name: 'duration', title: 'Total Duration (e.g. 4h 30min)', type: 'string' },
    {
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Module Title', type: 'string' },
          {
            name: 'lessons',
            title: 'Lessons',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                { name: 'title', title: 'Lesson Title', type: 'string' },
                { name: 'videoId', title: 'YouTube Video ID', type: 'string' },
                { name: 'duration', title: 'Duration (e.g. 18 min)', type: 'string' },
                { name: 'description', title: 'Lesson Description', type: 'text' },
              ],
            }],
          },
        ],
      }],
    },
  ],
};
