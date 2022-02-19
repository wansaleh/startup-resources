import cheerio from 'cheerio';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ query }) {
  const url = query.get('url');
  const html = await fetch('https://startup-resources-ten.vercel.app/').then(
    (res) => res.text()
  );
  const $ = cheerio.load(html);

  const icons = [];
  $('link[rel="icon"]').map((i, el) => {
    icons.push({
      url: $(el).attr('href'),
      size: $(el).attr('sizes'),
    });
  });

  return {
    body: { icons },
  };
}
