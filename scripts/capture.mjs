import captureWebsite from 'capture-website';
import fetch from 'node-fetch';
import { join } from 'path';
import { existsSync } from 'fs';

const checkExists = false;
const width = 1280;
const ratio = 16 / 9;

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
        const thumbPath = join(
          dir,
          'static/screenshots',
          `${resource.id}.webp`
        );

        if (!checkExists || (checkExists && !existsSync(thumbPath))) {
          try {
            console.log('Capturing', resource.URL);

            await captureWebsite.file(resource.URL, thumbPath, {
              delay: 4,
              overwrite: true,
              width,
              height: width / ratio,
              type: 'webp',
            });

            console.log('Done capturing', resource.URL);
          } catch (e) {
            console.error('Error capturing', resource.URL);
          }
        }
      })
  );
}

main();
