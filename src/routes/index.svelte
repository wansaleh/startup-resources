<script context="module">
  export const prerender = true;
</script>

<script lang="ts">
  import FilterButton from '$lib/components/filter-button.svelte';

  import ResourceCard from '$lib/components/resource-card.svelte';
  import type { Resource } from '$lib/types';
  import { cleanCategory } from '$lib/utils';

  export let resources: Resource[];
  let filtered = resources;
  let activeCategory = null;
  let activePricing = null;

  $: pricings = ['Free', 'Paid', 'Subscription', '%'];
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
    if (activeCategory && activePricing) {
      return (
        cleanCategory(r.Category[0]) === activeCategory &&
        r.Price.toLowerCase().includes(activePricing.toLowerCase())
      );
    }
    if (activeCategory) {
      return cleanCategory(r.Category[0]) === activeCategory;
    }
    if (activePricing) {
      return r.Price.toLowerCase().includes(activePricing.toLowerCase());
    }
    return true;
  });
</script>

<div class="layout py-24">
  <h1 class="lg:text-4xl relative text-3xl font-semibold tracking-tight mb-1">
    <span>Startup Resources</span>
  </h1>

  <h2 class="lg:text-2xl relative text-xl font-normal tracking-tight mb-10">
    Resources compiled by
    <a
      href="https://twitter.com/heyeaslo"
      rel="external"
      target="_blank"
      class="hover:underline font-semibold"
    >
      @heyeaslo
    </a>
    on
    <a
      href="https://easlo.notion.site/daaf8758b26f4618965b49f0129c3ecf?v=8bb7fe0b5cd44e139e06fe27dd7051cd"
      rel="external"
      target="_blank"
      class="hover:underline font-semibold"
    >
      Notion
    </a>
  </h2>

  <div class="flex flex-wrap gap-1.5 mb-4">
    <FilterButton
      isActive={activeCategory === null}
      onClick={() => (activeCategory = null)}
    >
      All
    </FilterButton>
    {#each categories as category}
      <FilterButton
        isActive={activeCategory === category.name}
        onClick={() => (activeCategory = category.name)}
      >
        {category.name}
      </FilterButton>
    {/each}
  </div>

  <div class="flex flex-wrap gap-1.5 mb-8">
    <FilterButton
      isActive={activePricing === null}
      onClick={() => (activePricing = null)}
    >
      All
    </FilterButton>
    {#each pricings as pricing}
      <FilterButton
        isActive={activePricing === pricing}
        onClick={() => (activePricing = pricing)}
      >
        {pricing}
      </FilterButton>
    {/each}
  </div>

  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
  >
    {#each filtered as resource (resource.id)}
      <ResourceCard {resource} />
    {:else}
      <div
        class="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 text-center py-20 text-gray-500 text-sm font-semibold"
      >
        No result. <button
          on:click={() => {
            activeCategory = null;
            activePricing = null;
          }}
          class="hover:underline font-semibold"
        >
          Try another filter.
        </button>
      </div>
    {/each}
  </div>
</div>
