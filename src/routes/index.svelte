<script context="module">
  export const prerender = true;
</script>

<script lang="ts">
  type Resource = {
    id: string;
    Price: string;
    Description: string;
    Features: string;
    Category: string[];
    Twitter: string;
    URL: string;
    Name: string;
  };

  export let resources: Resource[];
  let filtered = resources;
  let activeCategory = null;

  $: categories = [
    ...new Set(resources.map((r) => cleanCategory(r.Category[0]))),
  ]
    .map((category) => ({
      name: category,
      count: resources.filter((r) => cleanCategory(r.Category[0]) === category)
        .length,
    }))
    .sort((a, b) => b.count - a.count);
  $: filtered = resources.filter((r) => {
    if (activeCategory) {
      return cleanCategory(r.Category[0]) === activeCategory;
    }
    return true;
  });

  function cleanCategory(category) {
    return category.replace(/[^\p{L}\p{N}\p{P}\p{Z}{\^\$}]/gu, '').trim();
  }

  function cleanDomain(url) {
    if (!url) return '';
    return url.replace(/^https:\/\/(www\.)?|\/$/g, '');
  }
</script>

<div class="layout py-24">
  <h1 class="lg:text-4xl relative text-3xl font-semibold tracking-tight mb-10">
    <span>Startup Resources</span>
  </h1>

  <div class="flex flex-wrap gap-1.5 mb-10">
    <button
      on:click={() => (activeCategory = null)}
      type="button"
      class="block text-sm bg-gray-500/30 rounded px-2 py-0.5
      {activeCategory === null && 'bg-black text-white'}"
    >
      All
    </button>
    {#each categories as category}
      <button
        on:click={() => (activeCategory = category.name)}
        type="button"
        class="block text-sm bg-gray-500/30 rounded px-2 py-0.5 {activeCategory ===
          category.name && 'bg-black text-white'}"
      >
        {category.name}
      </button>
    {/each}
  </div>

  <div class="grid grid-cols-4 gap-6">
    {#each filtered as resource (resource.id)}
      <div
        class="border border-gray-500/30 p-4 rounded shadow flex flex-col overflow-hidden hover:shadow-md transition"
      >
        <!-- <div class="-mx-4 -mt-4 mb-4">
          <img src="/static/screenshots/{resource.id}.webp" alt="" />
        </div> -->

        <div class="flex justify-between items-center">
          <span class="text-xs font-bold">
            {cleanCategory(resource.Category[0])}
          </span>

          <span class="text-xs font-bold">{resource.Price}</span>
        </div>

        <h3 class="text-lg font-semibold mb-2 mt-2 leading-tight">
          {resource.Name}
        </h3>

        <div class="text-sm mb-4 font-normal">{resource.Description}</div>

        <ul class="text-xs mb-4 font-light">
          {#each resource.Features.trim()
            .split('\n')
            .filter((feature) => Boolean(feature)) as feature}
            <li class="ml-3 pl-1 relative mb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-[1em] h-[1em] absolute right-full top-0.5 stroke-brand"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {feature.replace('✅', '').trim()}
            </li>
          {/each}
        </ul>

        <div class="flex-1" />

        <div class="flex justify-between gap-4">
          <span class="text-xs font-semibold line-clamp-1">
            <a
              href={resource.URL}
              rel="external"
              target="_blank"
              class="hover:underline"
            >
              {cleanDomain(resource.URL)}
            </a>
          </span>

          {#if resource.Twitter}
            <a
              href="htts://twitter.com/{resource.Twitter.substring(1)}"
              rel="external"
              target="_blank"
              class="text-xs font-semibold hover:underline"
            >
              {resource.Twitter}
            </a>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>
