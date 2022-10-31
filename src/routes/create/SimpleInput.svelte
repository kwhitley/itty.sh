<script>
  import { randomItem } from 'supergeneric/randomItem'
  import SearchInput from '~/components/SearchInput.svelte'
  import { api } from '~/api'
  import { keyLength, textTTL } from '~/stores'
  import { onInterval } from '~/utils/onInterval'

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
  $: if (value) {
    stop()
  } else {
    start()
  }

  const detectType = payload => {
    if (typeof payload !== 'string') return ''

    if (payload.match(/(<html>)|(<\/?\w+>)/gi)) return 'text/html'

    return ''
  }

  // SAVE PAYLOAD
  const save = async (payload, as = '') => {
    submitting = true
    value = ''
    stop() // stop placeholder
    placeholder = 'generating...'

    // auto-detect type if not explicity passed
    if (!as) {
      as = detectType(payload)
    }

    await api.post(`/create?length=${$keyLength}&as=${as}&ttl=${$textTTL}`, payload)
            .then(response => {
              id = response.key
            })
            .catch(err => {
              submitting = false
              console.error('ERROR: There was an error creating a link.', err.stack)
            })

    shuffle()
    start() // resume placeholder shuffle
    submitting = false
  }
</script>

<!-- MARKUP -->
<SearchInput
  placeholder={placeholder}
  bind:value={value}
  on:file={e => save(e.detail)}
  on:submit={() => save(value)}
  disabled={disabled}
  minHeight="6rem"
  />

<!-- STYLES -->
<style lang="scss">

</style>
