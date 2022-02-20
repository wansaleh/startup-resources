<script lang="ts">
  import { page } from '$app/stores';
  import ThemeSelect from './theme-select.svelte';
</script>

<div class="flex justify-between items-center layout py-6">
  <a
    sveltekit:prefetch
    href="/"
    class="lg:text-base group flex gap-2 items-center text-sm font-semibold leading-tight"
  >
    <span class="group-hover:text-brand transition duration-300">
      Startup Resources
    </span>
  </a>

  <ul class="lg:gap-2 flex items-center text-sm font-semibold">
    <li>
      <a
        rel="external"
        target="_blank"
        href="https://easlo.notion.site/daaf8758b26f4618965b49f0129c3ecf?v=8bb7fe0b5cd44e139e06fe27dd7051cd"
        class="hover:underline"
      >
        Notion
      </a>
    </li>
    <li>
      <ThemeSelect />
    </li>
  </ul>
</div>
