<script>
  import { createEventDispatcher } from 'svelte'
  import { autofocus } from '~/actions/autofocus'
  import { onPaste } from '~/utils/onPaste'

  let el
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
    const item = e.dataTransfer?.items[0]?.getAsFile()

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
    bind:this={el}
    use:autofocus
    />

    <button type="submit" disabled={disabled}>
      Save It
    </button>
</form>

<!-- STYLES -->
<style lang="scss">
  :root {
    --search-button-inset: 0.3em;
    --search-button-padding: 0.9em;
    --input-padding: 0.65em;
  }

  form {
    margin-bottom: 1em;
    position: relative;
    width: 100%;
    font-size: 2em;

    input {
      font-size: clamp(1.4rem, 5vw, 1em);
      padding: var(--input-padding) 7.5em var(--input-padding) 0.7em;
      font-weight: 100;
      width: 100%;
      min-height: 7rem;

      &::placeholder {
        white-space: pre-line;
      }

      @media screen and (max-width: 400px) {
        padding-right: 0.7em;
      }
    }

    button {
      font-size: 0.8em;
      position: absolute;
      right: var(--search-button-inset);
      top: var(--search-button-inset);
      bottom: var(--search-button-inset);
      width: auto;
      padding: 0 var(--search-button-padding);
      border-radius: calc(0.5 * var(--border-radius));

      @media screen and (max-width: 400px) {
        position: relative;
        right: auto;
        left: auto;
        width: 100%;
        min-height: 3rem;
      }
    }
  }
</style>
