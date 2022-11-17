<script>
  import { pageTitle } from '~/utils/pageTitle'
</script>

<svelte:head>
  <title>{pageTitle('create')}</title>
  <meta name="description" content="This is where the magic happens!" />
</svelte:head>

<!-- MARKUP -->
<slot />
