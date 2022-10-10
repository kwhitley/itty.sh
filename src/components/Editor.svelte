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
</script>

<!-- MARKUP -->
<label>
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
    />
</label>

<!-- STYLES -->
<style lang="scss">
  textarea {
    resize: none;
  }
</style>
