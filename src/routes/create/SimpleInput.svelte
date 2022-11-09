<script>
  import { randomItem } from 'supergeneric/randomItem'
  import SearchInput from '~/components/SearchInput.svelte'
  import { api } from '~/api'
  import { post } from '~/api/post'
  import { keyLength, textTTL } from '~/stores'
  import { onInterval } from '~/utils/onInterval'
  import { postResults } from '~/stores'

  // CONSTANTS
  const PLACEHOLDER_SHUFFLE_SPEED = 2000

  // external variables
  export let id = ''
  export let submitting = false

  let value = ''
  let placeholderOptions = [
    'enter a link',
    'enter some text',
    'paste an image',
    'drag a file',
  ]
  let placeholder = placeholderOptions[0]

  // shuffle placeholder
  const shuffle = () => {
    let next = placeholder

    while (next === placeholder) {
      next = randomItem(placeholderOptions)
    }

    placeholder = next
  }

  // register start/stop functions for the placeholder shuffle
  const { start, stop } = onInterval(shuffle, PLACEHOLDER_SHUFFLE_SPEED)

  // REACTIVE BITS
  $: disabled = submitting || !value
  $: if ($postResults?.submitting) {
    stop()
  } else {
    shuffle()
    start()
  }

  const detectType = payload => {
    if (typeof payload !== 'string') return ''

    if (payload.match(/(<html>)|(<\/?\w+>)/gi)) return 'text/html'

    return ''
  }

  // SAVE PAYLOAD
  const save = async (payload, as = '') => {
    const isArrayOfFiles = Array.isArray(payload) && payload[0] instanceof File

    console.log('SAVING', payload)
    // submitting = true
    value = ''
    placeholder = 'sending...'

    // auto-detect type if not explicity passed
    if (!as) {
      as = detectType(payload)

      as = as ? `&as=${as}` : ''
    }

    post(isArrayOfFiles ? payload : [payload], {
      ttl: $textTTL.replace(/\s/, ''),
      length: $keyLength,
      as,
    })

    start() // resume placeholder shuffle
  }
</script>

<!-- MARKUP -->
<SearchInput
  placeholder={placeholder}
  bind:value={value}
  on:files={e => save(e.detail)}
  on:submit={() => save(value)}
  disabled={$postResults?.submitting}
  minHeight="6rem"
  />

<!-- STYLES -->
<style lang="scss">

</style>
