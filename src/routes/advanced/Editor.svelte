<script>
  import { createEventDispatcher } from 'svelte'
  import { autosize } from '~/actions/autosize'
  import { onPaste } from '~/utils/onPaste'

  export let value = ''
  export let label = ''
  export let placeholder = "type some text"
  export let rows = 1
  export let name = "editor"
  export let disabled = false

  const dispatch = createEventDispatcher()

  const dropped = (e) => {
    e.preventDefault()

    const items = [...e.dataTransfer?.items]
    const item = e.dataTransfer?.items[0]?.getAsFile()
    console.log('dropped', items)

    dispatch('files', items.map(i => i.getAsFile()))
  }
</script>

<!-- MARKUP -->
<label class="editor-label">
  {label}
  <textarea
    class="editor"
    name={name}
    bind:value={value}
    use:autosize
    placeholder={placeholder}
    rows={rows}
    disabled={disabled}
    on:paste={onPaste(dispatch)}
    on:drop={dropped}
    />
</label>

<!-- STYLES -->
<style lang="scss">
  textarea {
    resize: none;
    font-family: monospace;
    font-size: 0.9rem;
    padding: 1em;
    font-weight: 400;
  }
</style>
