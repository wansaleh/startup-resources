/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
  const resources = await fetch(
    'https://notion-api.splitbee.io/v1/table/daaf8758b26f4618965b49f0129c3ecf'
  ).then((res) => res.json());

  return {
    body: {
      resources: resources.filter((resource) => Boolean(resource.URL)),
    },
  };
}
