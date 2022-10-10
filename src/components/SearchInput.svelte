<script>
  import { createEventDispatcher } from 'svelte'
  import { onPaste } from '~/utils/onPaste'

  export let value = ''
  export let disabled
  export let placeholder = 'search'
  export let clearOnSubmit = false

  const dispatch = createEventDispatcher()

  const submitHandler = e => {
    e.preventDefault()
    dispatch('submit', value)

    if (clearOnSubmit) {
      value = ''
    }
  }

  const dropped = (e) => {
    e.preventDefault()
    console.log('something dropped', e)

    const item = e.dataTransfer?.items[0]?.getAsFile()
    console.log('item', item)

    dispatch('file', item)
  }
</script>

<!-- MARKUP -->
<form on:submit={submitHandler} disabled={disabled}>
  <input
    type="text"
    class="search"
    placeholder={placeholder}
    bind:value
    on:paste={onPaste(dispatch)}
    on:drop={dropped}
    />

    <button type="submit" disabled={disabled}>Go</button>
</form>

<!-- STYLES -->
<style lang="scss">
  :root {
    --search-button-inset: 0.5em;
    --search-button-padding: 0.9em;
  }

  form {
    margin-bottom: 1em;
    position: relative;
    width: 100%;

    input {
      font-size: 1.4em;
      padding: 0.4em 2.5em 0.4em 0.4em;
      font-weight: 100;
      width: 100%;
    }

    button {
      position: absolute;
      right: var(--search-button-inset);
      top: var(--search-button-inset);
      bottom: var(--search-button-inset);
      width: auto;
      padding: 0 var(--search-button-padding);
      border-radius: calc(0.5 * var(--border-radius));
    }
  }
</style>
