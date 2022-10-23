<script>
  import { fade, slide } from 'svelte/transition'
  import { api } from '~/ity.sh/api'
  export let key

  $: qrcode = api.get(`/${key}.QR`)
</script>

{#await qrcode}
{:then value}
  <div
    class="qrcode"
    in:fade={{ duration: 400, delay: 150 }}
    >
    {@html value}
  </div>
{/await}

<style lang="scss">
  .qrcode {
    flex: 1;
  }

  :global(.qrcode svg) {
    height: 100%;
    width: 100%;
  }
</style>

