<script lang="ts">
  import ResourceCard from './resource-card.svelte';
  import type { Resource } from '$lib/types';
  import { cleanCategory } from '$lib/utils';

  export let category;
  export let resources: Resource[];

  let filtered = [];
  $: filtered = resources
    .filter((resource) => cleanCategory(resource.Category[0]) === category.name)
    .sort((a, b) => a.Name.localeCompare(b.Name));
</script>

{#if filtered.length > 0}
  <div
    class="grid grid-cols-1 lg:grid-cols-5 py-6 border-b last:border-b-0"
    id={category.name.replace(/\s+/g, '-')}
  >
    <div>
      <div class="sticky top-6">
        <h3 class="text-2xl font-semibold leading-tight">{category.name}</h3>
        <div class="text-lg text-gray-500 pb-4">
          {filtered.length} resource{filtered.length > 1 ? 's' : ''}
        </div>
      </div>
    </div>

    <div
      class="col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {#each filtered as resource}
        <ResourceCard {resource} />
      {/each}
    </div>
  </div>
{/if}
