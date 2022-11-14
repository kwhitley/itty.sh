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
  export let type = "text"
  export let disabled = false

  $: isValid = validate(value)

  const dispatch = createEventDispatcher()

  function typeAction(node) {
		node.type = type
	}

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

    const items = [...e.dataTransfer?.items]
    const item = e.dataTransfer?.items[0]?.getAsFile()
    console.log('dropped', items)

    dispatch('files', items.map(i => i.getAsFile()))
  }
</script>

<!-- MARKUP -->
<form class="search-input" on:submit={submitWrapper} disabled={disabled}>
  <input
    use:typeAction
    placeholder={placeholder}
    bind:value
    on:paste={onPaste(dispatch)}
    on:drop={dropped}
    use:autofocus
    style="min-height:{minHeight};"
    disabled={disabled}
    />

    <button type="submit" disabled={!isValid || disabled}>
      {buttonText}
    </button>
</form>

<!-- STYLES -->
<style lang="scss">
  :root {
    --search-button-inset: 0.4em;
    --search-button-padding: 0.9em;
    --input-padding: 0.65em;
    --search-input-font-size: 2em;
    --search-input-button-font-size: 0.8em;
  }

  form {
    margin-bottom: 1em;
    position: relative;
    width: 100%;
    font-size: var(--search-input-font-size);

    input {
      font-size: clamp(1.2rem, 5vw, 1em);
      padding: var(--input-padding) 0.7em;
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
      font-size: var(--search-input-button-font-size);
      position: absolute;
      right: var(--search-button-inset);
      top: var(--search-button-inset);
      bottom: var(--search-button-inset);
      width: auto;
      padding: 0 var(--search-button-padding);
      border-radius: calc(0.5 * var(--border-radius));
      letter-spacing: 0.02em;

      @media screen and (max-width: 55em) {
        font-size: calc(0.8 * var(--search-input-button-font-size));
        text-align: left;
        white-space: pre-line;
      }

      @media screen and (max-width: 35em) {
        font-size: calc(0.8 * var(--search-input-button-font-size));

      }

      @media screen and (max-width: 40em) {
        white-space: normal;
        position: relative;
        right: auto;
        left: auto;
        width: 100%;
        font-size: 0.85em;
        text-align: center;
        min-height: 3.2rem;
        font-weight: 100;
        border-radius: var(--border-radius);
      }
    }
  }

  @media screen and (max-width: 50em) {
    :root {
      --search-button-inset: 0.4em;
      --search-input-font-size: 1.5em;
    }
  }

  @media screen and (max-width: 40em) {
    :root {
      --search-button-inset: 0.3em;
    }
  }
</style>
