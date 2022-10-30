<script>
  import { createEventDispatcher } from 'svelte'
  import { autofocus } from '~/actions/autofocus'
  import { onPaste } from '~/utils/onPaste'

  export let value = ''
  export let placeholder = 'search'
  export let clearOnSubmit = false
  export let buttonText = 'Save It'
  export let validate = value => Boolean(value)
  export let minHeight = '2rem'

  $: isValid = validate(value)
  $: disabled = !isValid

  const dispatch = createEventDispatcher()

  export let submitHandler = value => {
    console.log('calling onSubmit with', value)
    dispatch('submit', value)
  }

  const submitWrapper = async (e) => {
    e.preventDefault()

    await submitHandler(value)

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
<form on:submit={submitWrapper} disabled={disabled}>
  <input
    type="text"
    placeholder={placeholder}
    bind:value
    on:paste={onPaste(dispatch)}
    on:drop={dropped}
    use:autofocus
    style="min-height:{minHeight};"
    />

    <button type="submit" disabled={disabled}>
      {buttonText}
    </button>
</form>

<!-- STYLES -->
<style lang="scss">
  :root {
    --search-button-inset: 0.5em;
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
      letter-spacing: 0.02em;

      @media screen and (max-width: 400px) {
        position: relative;
        right: auto;
        left: auto;
        width: 100%;
        min-height: 3.5rem;
        font-weight: 100;
      }
    }
  }
</style>
