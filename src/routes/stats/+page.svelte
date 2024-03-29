<script>
  import { round } from 'supergeneric/round'
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { api } from '~/api'
  import { DEV } from '~/constants'
	import { pageTitle } from '~/utils/pageTitle'

  let waitlistUsers = ''
  let stats = ''
  let loaded = false

  // formats number to locale (e.g. commas)
  const formatNumber = number => number.toLocaleString()

  // temporary
  onMount(async () => {
    stats = await api.get('/stats')

    loaded = true
  })
</script>

<svelte:head>
  <title>{pageTitle('stats')}</title>
  <meta name="description" content="Overall health status and snapshot stats for the itty engine." />
</svelte:head>

<!-- MARKUP -->
<h1>itty stats</h1>

{#if loaded}
  <section in:fade={{ duration: 400 }}>
    <h3>Current Volume</h3>
    <dl>
      <dt>total</dt>
      <dd><em>{round(stats.current.GB, 4)}<small>GB</small></em> in {formatNumber(stats.current.entries)} entries</dd>
    </dl>

    <h3>Lifetime</h3>
    <dl>
      <dt>created</dt>
      <dd><em>{round(stats.lifetime.stored.GB, 4)}<small>GB</small></em> in {formatNumber(stats.lifetime.stored.entries)} entries</dd>

      <dt>served</dt>
      <dd>
        <em>{round(stats.lifetime.served.GB, 4)}<small>GB</small></em>
        in {formatNumber(stats.lifetime.served.entries)} entries
      </dd>

      <dt>qr served</dt>
      <dd>
        <em>{formatNumber(stats.lifetime.served.qrCodes)}</em> codes
      </dd>
    </dl>
  </section>
{:else}
  <div class="loading">Loading...</div>
{/if}

<!-- STLYES -->
<style lang="scss">
  h3 {
    margin-bottom: 0.4em;
  }

  dl {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 0;
    align-items: center;
  }

  dd, dt {
    display: flex;
    flex-flow: row wrap;
    column-gap: 0.4em;
    align-items: center;
    padding: 0.4em 1em;
    height: 100%;
  }

  dt:nth-child(4n + 1), dt:nth-child(4n + 1) + dd {
    background-color: var(--foreground-5);
  }

  dt {
    align-items: center;
    font-size: 0.7em;
    padding-right: 0;
    line-height: 0em;
    white-space: nowrap;
    min-width: 5rem;
  }

  dd {
    padding-left: 0.5em;
    align-items: baseline;
  }

  em {
    font-family: sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 1.2em;
    color: var(--accent-color);
  }

  small {
    font-size: 0.65em;
    margin-left: 0.2em;
  }

  .loading {
    color: var(--foreground-10);
    font-size: 1.5em;
    font-weight: 100;
    font-family: sans-serif;
  }
</style>
