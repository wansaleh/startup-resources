import favicons from '$lib/data/favicons.json';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
  const id = params.id;

  return {
    body: favicons[id],
  };
}
