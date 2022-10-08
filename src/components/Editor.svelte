<script>
  import { autosize } from '~/actions/autosize'

  export let value
  export let label = ''
  export let placeholder = "type some text"
  export let rows = 1
  export let name = "editor"
  export let disabled = false
</script>

<!-- MARKUP -->
<label>
  {label}
  <textarea
    name={name}
    bind:value={value}
    use:autosize
    placeholder={placeholder}
    rows={rows}
    disabled={disabled}
    />
</label>

<!-- STYLES -->
<style lang="scss">
  textarea {
    resize: none;
  }
</style>
