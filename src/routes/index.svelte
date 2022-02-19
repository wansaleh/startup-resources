<script context="module">
  export const prerender = true;
</script>

<script>
  export let resources;

  function cleanDomain(url) {
    if (!url) return '';
    return url.replace(/^https:\/\/(www\.)?|\/$/g, '');
  }
</script>

<div class="layout py-24">
  <h1 class="lg:text-5xl relative text-4xl font-semibold tracking-tight mb-10">
    <span>Startup Resources</span>
  </h1>

  <div class="grid grid-cols-4 gap-6">
    {#each resources as resource (resource.id)}
      <div
        class="border border-gray-500/30 p-4 rounded shadow flex flex-col overflow-hidden"
      >
        <!-- <div class="-mx-4 -mt-4 mb-4">
          <img src="/static/screenshots/{resource.id}.webp" alt="" />
        </div> -->

        <div>
          <span
            class="text-xs font-bold bg-gray-500/30 px-1.5 py-0.5 rounded-md"
          >
            {@html resource.Category[0].replace(' ', '&nbsp;&nbsp;')}
          </span>
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

        <div class="text-xs font-semibold line-clamp-1">
          <a
            href={resource.URL}
            rel="external"
            target="_blank"
            class="hover:underline"
          >
            {cleanDomain(resource.URL)}
          </a>
        </div>
      </div>
    {/each}
  </div>
</div>
