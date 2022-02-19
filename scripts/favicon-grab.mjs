import { downloadIcons } from 'favicon-downloader';
import { join } from 'path';

async function main() {
  process.setMaxListeners(0);

  const dir = process.cwd();
  // console.log(dir);

  const resources = await fetch(
    'https://notion-api.splitbee.io/v1/table/daaf8758b26f4618965b49f0129c3ecf'
  ).then((res) => res.json());

  Promise.all(
    resources
      .filter((resource) => Boolean(resource.URL))
      .map(async (resource) => {
        const iconPath = join(dir, 'static/siteicons', `${resource.id}.webp`);

        try {
          console.log('Getting favicon', resource.URL);

          await downloadIcons(resource.URL, {
            path: iconPath,
          });

          console.log('Done getting favicon', resource.URL);
        } catch (e) {
          console.error('Error getting favicon', resource.URL);
        }
      })
  );
}

main();
