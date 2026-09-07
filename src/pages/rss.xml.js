import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('blog'))
    .filter(post => !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'Ase de la Cruz - Blog',
    description: 'Artículos, guías y consejos sobre seguros y planificación patrimonial',
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      link: `/blog/${post.slug}`,
      pubDate: post.data.pubDate,
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: `<language>es-AR</language>`,
  });
}