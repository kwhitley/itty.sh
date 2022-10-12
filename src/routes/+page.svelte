<script>
  import { randomItem } from 'supergeneric/randomItem'
  import SearchInput from '~/components/SearchInput.svelte'
  import KeyLength from '~/components/KeyLength.svelte'
  import { api } from '~/ity.sh/api'
  import Page from '~/layout/Page.svelte'
  import { onInterval } from '~/utils/onInterval'
  import Intro from './Intro.svelte'
  import Preview from './Preview.svelte'
  import { keyLength } from '~/stores'

  const PLACEHOLDER_SHUFFLE_SPEED = 2000

  let value = ''
  let placeholderOptions = [
    'enter a link',
    'enter some text',
    'paste an image',
    // 'write a function*',
    'drag a file*',
  ]
  let placeholder = placeholderOptions[0]
  let id = ''
  let submitting = false

  // shuffle function
  const shuffle = () => {
    let next = placeholder

    while (next === placeholder) {
      next = randomItem(placeholderOptions)
    }

    placeholder = next
  }

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

    await api.post(`/create?length=${$keyLength}&as=${as}`, payload)
            .then(response => {
              id = response.id
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

<Page splash>
  <main>
    <KeyLength />

    <section class="form">
      <SearchInput
        placeholder={placeholder}
        bind:value={value}
        on:file={e => save(e.detail)}
        on:submit={() => save(value)}
        disabled={disabled}
        />

      <Preview id={id} submitting={submitting} />
    </section>

    <Intro />
  </main>
</Page>

<style lang="scss">
  main {
    display: flex;
    flex-flow: column;
  }

  .form {
    font-size: 2.5em;
    font-size: clamp(1rem, 5vw, 2.5rem);
    display: flex;
    flex-flow: column;
    gap: 0.3em;
    margin-bottom: 0.1em;
  }

  // :global(label) {
  //   margin-bottom: 0.2em !important;
  // }

  // :global(.form button) {
  //   font-size: 0.8em;
  // }

  .editor-container {
    font-size: 0.5em;
  }

  label {
    font-size: 1.3rem;
    margin-bottom: 0em;
  }
</style>
