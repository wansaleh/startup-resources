<script lang="ts">
  import Category from '$lib/components/category.svelte';

  import FilterButton from '$lib/components/filter-button.svelte';

  import ResourceCard from '$lib/components/resource-card.svelte';
  import type { Resource } from '$lib/types';
  import { cleanCategory } from '$lib/utils';

  export let resources: Resource[];
  let filtered = resources;
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
    if (activePricing) {
      if (activePricing === 'Paid') {
        return (
          r.Price.toLowerCase().includes('paid') ||
          r.Price.toLowerCase().includes('pay')
        );
      }
      return r.Price.toLowerCase().includes(activePricing.toLowerCase());
    }
    return true;
  });
</script>

<div class="layout pt-4 pb-20">
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
    {#each categories as category}
      <FilterButton
        count={category.count}
        onClick={() => {
          document
            .getElementById(category.name.replace(/\s+/g, '-'))
            .scrollIntoView({ behavior: 'smooth' });
        }}
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
        {#if pricing === 'Free'}
          Free + Free Trial
        {:else if pricing === '%'}
          Profit Sharing
        {:else}
          {pricing}
        {/if}
      </FilterButton>
    {/each}
  </div>

  <div>
    {#each categories as category (category.name)}
      <Category {category} resources={filtered} />
    {/each}
  </div>

  {#if !filtered || filtered.length === 0}
    <div
      class="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 text-center py-20 text-gray-500 text-sm font-semibold"
    >
      No result. <button
        on:click={() => {
          activePricing = null;
        }}
        class="hover:underline font-semibold"
      >
        Try another filter.
      </button>
    </div>
  {/if}
</div>
