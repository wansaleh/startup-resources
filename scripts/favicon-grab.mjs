import { join } from 'path';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import fs from 'fs';

async function main() {
  process.setMaxListeners(0);

  const dir = process.cwd();
  // console.log(dir);

  const resources = await fetch(
    'https://notion-api.splitbee.io/v1/table/daaf8758b26f4618965b49f0129c3ecf'
  ).then((res) => res.json());

  const allIcons = {};

  await Promise.all(
    resources
      .filter((resource) => Boolean(resource.URL))
      // .slice(0, 5)
      .map(async (resource) => {
        try {
          console.log('Getting favicon', resource.URL);

          const html = await fetch(resource.URL).then((res) => res.text());
          const $ = cheerio.load(html);

          const icons = [];
          $('link[rel="icon"]').map((i, el) => {
            icons.push({
              url: $(el).attr('href'),
              size: $(el).attr('sizes'),
            });
          });

          allIcons[resource.id] = icons
            .filter(
              (icon) =>
                String(icon.url).endsWith('.png') ||
                String(icon.url).endsWith('.svg')
            )
            .map((icon) => {
              let url = icon.url;
              if (!url.startsWith('http')) {
                const slash = url.startsWith('/') ? '' : '/';
                url = `${resource.URL.replace(/\/$/, '')}${slash}${icon.url}`;
              }

              return {
                ...icon,
                url,
              };
            });

          console.log('Done getting favicon', resource.URL);
        } catch (e) {
          console.error('Error getting favicon', resource.URL);
        }
      })
  );

  fs.writeFileSync(
    join(dir, 'src/lib/data', `favicons.json`),
    JSON.stringify(allIcons, null, 2)
  );
}

main();
