<script>
  import Seo from '$lib/components/seo.svelte';
  import Footer from '$lib/components/footer.svelte';
  import Nav from '$lib/components/nav.svelte';

  import '../app.css';
  import '../nprogress.css';
</script>

<Seo />

<div class="relative">
  <Nav />

  <main class="relative min-h-screen font-normal">
    <slot />

    <Footer />
  </main>
</div>
