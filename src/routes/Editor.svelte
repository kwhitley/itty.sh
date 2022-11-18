<script>
  import { createEventDispatcher } from 'svelte'
  import { autosize } from '~/actions/autosize'
  import { onPaste } from '~/utils/onPaste'
  import { PATH } from '~/api'
  import { toast } from '~/services/toast'

  export let value = ''
  export let label = ''
  export let placeholder = "type some text"
  export let rows = 1
  export let name = "editor"
  export let disabled = false

  const dispatch = createEventDispatcher()

  const downloadImage = async url => new Promise(resolve => {
    const imageURL = `${PATH}/fetch/${url}`
    const image = new Image()
    image.crossOrigin = 'Anonymous'
    image.addEventListener('load', () => resolve(image), false)
    image.onerror = () => {
      toast('There was an issue loading this image...', { type: 'error', duration: '2 seconds' })
    }
    image.src = imageURL
  })

  const dropped = async (e) => {
    e.preventDefault()

    const dt = e.dataTransfer

    let html = dt.getData('text/html'),
        match = html && /\bsrc="?([^"\s]+)"?\s*/.exec(html),
        url = match && match[1]

    // try second pass as href
    if (html && !url) {
      match = html && /\href="?([^"\s]+)"?\s*/.exec(html),
      url = match && match[1]
    }

    console.log('e', e)
    console.log('test', e.dataTransfer)
    console.log('html', dt.getData('text/html'))
    console.log('match', match)
    console.log('url', url)

    const items = [...e.dataTransfer?.items]
    const item = e.dataTransfer?.items[0]?.getAsFile()
    console.log('dropped', items)

    if (url) {
      dispatch('submit', url)
      // const img = await downloadImage(url)
      // const canvas = document.createElement('canvas')
      // const context = canvas.getContext('2d')
      // canvas.width = img.width
      // canvas.height = img.height
      // context.drawImage(img, 0, 0)
      // canvas.toBlob(function(blob) {
      //   dispatch('files', blob)
      // }, 'image/png')
    } else {
      // we assume files were dropped
      dispatch('files', items.map(i => i.getAsFile()))
    }
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
    font-size: 1rem;
    padding: 1em;
    font-weight: 400;

    &::placeholder {
      font-weight: 600;
      color: var(--foreground-50);
      font-size: 0.9em;
    }
  }
</style>
