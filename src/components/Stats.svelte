<script>
  import { onInterval } from '~/utils/onInterval'
  import { api } from '~/api'

  let stats = ''

  const fetchStats = () => api.get('/stats').then(v => stats = v)

  onInterval(fetchStats, 1000, { autostart: true })
</script>

<!-- MARKUP -->
{#if stats || true}
<section>
  <strong>entries</strong>

  <span>created</span>
  <span class="stat">{stats?.entries?.created}</span>

  <span>served</span>
  <span class="stat">{stats?.entries?.served}</span>
</section>
<!-- <pre>{JSON.stringify(stats, null, 2)}</pre> -->
{/if}

<!-- STYLES -->
<style lang="scss">
  section {
    display: flex;
    flex-flow: row wrap;
    gap: 0.5em;
    align-items: center;
  }

  strong {
  }

  .stat {
    font-size: 2em;
  }
</style>
