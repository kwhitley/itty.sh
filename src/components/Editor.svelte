<script>
  import { autosize } from '~/actions/autosize'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let value = ''
  export let label = ''
  export let placeholder = "type some text"
  export let rows = 1
  export let name = "editor"
  export let disabled = false

  const onPaste = (e) => {
    const item = e?.clipboardData?.items[0]
    console.log('paste event detected', e)
    console.log('paste item', item)

    if (item.type.indexOf('image') === 0) {
      var blob = item.getAsFile()

      console.log('blob is', blob)

      dispatch('image', blob)
    }
  }
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
    on:paste={onPaste}
    />
</label>

<!-- STYLES -->
<style lang="scss">
  textarea {
    resize: none;
  }
</style>
