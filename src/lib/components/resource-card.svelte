<script lang="ts">
  import type { Resource } from '$lib/types';
  // import { cleanCategory, cleanDomain } from '$lib/utils';

  export let resource: Resource;
</script>

<div
  class="border border-gray-500/20 p-4 rounded-md shadow flex flex-col overflow-hidden hover:shadow-md hover:border-gray-500/40 link-overlay"
>
  <!-- <div class="flex flex-wrap justify-between items-center">
    <span class="text-xs font-bold">
      {cleanCategory(resource.Category[0])}
    </span>
  </div> -->

  <h3 class="text-lg font-semibold mb-2 mt-0 leading-tight">
    <!-- {#if resource.favicons.length > 0}
      <img src={resource.favicons[0].url} alt="" class="h-4 w-4 inline-block" />
    {/if} -->

    <a href={resource.URL} rel="external" target="_blank" class="link">
      {resource.Name}
    </a>
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

  <div class="flex flex-wrap justify-between gap-x-4">
    <span class="text-xs font-bold">{resource.Price}</span>

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
