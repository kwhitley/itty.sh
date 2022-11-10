<script>
  import { fade, slide } from 'svelte/transition'
  import { api } from '~/api'
  export let key
  export let background = 'transparent'

  let qrcode
  $: {
    if (key) {
      qrcode = api.get(`/${key}.QR?color=var(--foreground-color)&background=${background}`)
    }
  }
</script>

{#await qrcode}
{:then value}
  <div
    class="qrcode"
    in:fade|local={{ duration: 200, delay: 110 }}
    out:fade|local={{ duration: 100 }}
    >
    {@html value}
  </div>
{/await}

<style lang="scss">
  .qrcode {
    flex: 1;
    height: 100%;
    width: 100%;
  }

  :global(.qrcode svg) {
    height: 100%;
    width: 100%;
  }
</style>

