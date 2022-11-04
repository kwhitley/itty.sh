<script>
  import { fade } from 'svelte/transition'
  import { round } from 'supergeneric/round'
  import { onMount } from 'svelte'
  import { api } from '~/api'

  let waitlistUsers = ''
  let stats = ''
  let loaded = false

  onMount(async () => {
    [
      waitlistUsers,
      stats,
    ] = await Promise.all([
      api.get('/stats/waitlist'),
      api.get('/stats'),
    ])

    loaded = true
  })

  $: console.log('stats', stats)
</script>

<!-- MARKUP -->
<h1>itty stats</h1>

{#if loaded}
  <section in:fade={{ duration: 400 }}>
    <h3>Users</h3>
    <dl>
      <dt>Waitlist Users</dt>
      <dd><em>{waitlistUsers}</em></dd>
    </dl>

    <h3>Current Volume</h3>
    <dl>
      <dt>total</dt>
      <dd><em>{round(stats.current.GB, 4)}<small>GB</small></em> in {stats.current.entries} entries</dd>
    </dl>

    <h3>Lifetime</h3>
    <dl>
      <dt>created</dt>
      <dd><em>{round(stats.lifetime.stored.GB, 4)}<small>GB</small></em> in {stats.lifetime.stored.entries} entries</dd>

      <dt>served</dt>
      <dd>
        <em>{round(stats.lifetime.served.GB, 4)}<small>GB</small></em>
        in {stats.lifetime.served.entries} entries
      </dd>

      <dt>qr served</dt>
      <dd>
        <em>{stats.lifetime.served.qrCodes}</em> codes
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
    flex-flow: row;
    gap: 0.4em;
    align-items: center;
    padding: 0.4em 1em;
    min-height: 2.5rem;
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
  }

  dd {
    padding-left: 0.5em;
    align-items: baseline;
  }

  em {
    font-family: sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 1.1em;
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
