<script>
  import { pageTitle } from '~/utils/pageTitle'
</script>

<svelte:head>
  <title>{pageTitle('create')}</title>
  <meta name="description" content="Snapshot stats for the itty engine." />
</svelte:head>

<!-- MARKUP -->
<slot />
