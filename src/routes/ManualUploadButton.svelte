<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let disabled = false
  let hiddenInput

  const openHiddenFileInput = () => hiddenInput.click()

  const manualUpload = () => {
    dispatch('files', [...hiddenInput.files ])
  }
</script>

<!-- MARKUP -->
<button
  disabled={disabled}
  on:click={openHiddenFileInput}
  >
  ...or browse to upload
  <input
    multiple
    type="file"
    class="hidden"
    bind:this={hiddenInput}
    on:change={manualUpload}
    />
</button>

<!-- STYLES -->
<style lang="scss">
  button {
    border-radius: 0;
  }
</style>
