<script lang="ts">
  import Footer from './footer.svelte';

  export let isActive: boolean = false;
  export let count: number | null = null;
  export let onClick = () => {};
</script>

<button
  type="button"
  class="block text-sm border border-gray-500/20 hover:border-gray-500/50 rounded-md px-2.5 leading-relaxed shadow-sm hover:shadow font-medium {isActive &&
    'bg-black dark:bg-white text-white dark:text-black font-semibold'}"
  on:click={onClick}
>
  <slot />
  {#if count !== null}
    <span class="ml-0.5 opacity-60 text-[0.85em]">{count}</span>
  {/if}
</button>
