<script>
  import { ttl, textTTL } from '~/stores'
  import Selector from '~/components/Selector.svelte'

  const options = [
    { value: '10 seconds', paid: true, extra: 'demo only' },
    { value: '1 minute', paid: true },
    { value: '1 hour' },
    { value: '1 day' },
    { value: '1 week' },
    { value: '1 month', paid: true },
    { value: '1 year', paid: true },
    { value: '10 years', label: 'until I unsubscribe', paid: true },
  ]
</script>

<!-- MARKUP -->
<Selector
  options={options}
  bind:value={$textTTL}
  />

<!-- STYLES -->
<style lang="scss">

</style>
