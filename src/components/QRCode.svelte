<script>
  import { fade, slide } from 'svelte/transition'
  import { api } from '~/api'
  export let key
  let qrcode

  $: {
    if (key) {
      qrcode = api.get(`/${key}.QR?color=var(--foreground-color)&background=var(--background-color)`)
    }
  }
</script>

{#await qrcode}
{:then value}
  <div
    class="qrcode"
    in:fade={{ duration: 200, delay: 110 }}
    out:fade={{ duration: 100 }}
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

