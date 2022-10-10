<script>
  import { slide } from 'svelte/transition'
  import { onDestroy, onMount } from 'svelte'
  import Page from '~/layout/Page.svelte'
  import Editor from '~/components/Editor.svelte'
  import SearchInput from '~/components/SearchInput.svelte'
  import Copy from '~/components/icons/Copy.svelte'
  import Intro from './Intro.svelte'
  import { randomItem } from 'supergeneric/randomItem'
  import { generateHash } from 'supergeneric/generateHash'
  import { random } from 'supergeneric/random'
  import { onInterval } from '~/utils/onInterval'
  import { api } from '~/ity.sh/api'
  import { error } from '@sveltejs/kit'

  const PREFIX = 'ity.sh'
  const PROTOCOL = 'https://'
  const PLACEHOLDER_SHUFFLE_SPEED = 2000

  let keyLength = 7
  let value
  let placeholderOptions = [
    'enter a link',
    'enter some text',
    'paste an image',
    'write a function*',
    'drag a file*',
  ]
  let placeholder = placeholderOptions[0]
  let id = ''
  let copied = false
  $: link = `${PREFIX}/${id}`
  $: fullLink = `${PROTOCOL}${PREFIX}/${id}`

  let submitting = false

  const obfuscate = () => {
    const newLetter = generateHash(1)
    const target = random(0, id.length - 1)

    id = id.split('').map((v, i) => i === target ? newLetter : v).join('')
  }

  const idShuffler = onInterval(obfuscate, 5)

  // side effect to shuffle id when submitting
  $: if (submitting && id) {
    idShuffler.start()
  } else {
    idShuffler.stop()
  }

  $: showPreview = id
  $: disabled = submitting || !value

  // shuffle function
  const shuffle = () => {
    let next = placeholder

    while (next === placeholder) {
      next = randomItem(placeholderOptions)
    }

    placeholder = next
  }

  const { start, stop } = onInterval(shuffle, PLACEHOLDER_SHUFFLE_SPEED)

  const submit = async () => {
    console.log('submitting')
    submitting = true
    copied = false
    const payload = value
    value = ''
    stop()
    placeholder = 'generating...'
    const response = await api
                            .post('/create', payload, { headers: { 'itty-key-length': keyLength }})
                            .catch(err => {
                              console.error('there was an error posting content')
                            })
    submitting = false
    shuffle()
    start()
    id = response.id
  }

  const filePasted = async e => {
    console.log('detected file pasted', e.detail)
    submitting = true
    value = ''
    placeholder = 'generating...'
    copied = false
    stop()

    await fetch(`${PROTOCOL}${PREFIX}/create`, { method: 'POST', body: e.detail, headers: { 'itty-key-length': keyLength }})
            .then(async response => {
              const json = await response.json()
              id = json.id
              submitting = false
              start()
              shuffle()
            })
            .catch(err => {
              console.error('there was an error posting content')
            })
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(fullLink)
    copied = true
  }

  $: if (value) {
    stop()
  } else {
    start()
  }

  const dropped = () => {
    console.log('something dropped')
  }
</script>

<Page splash>
  <main>

    <section class="form">
      <label>
        length of key ({keyLength})
        <input type="range" min="2" max="15" bind:value={keyLength} />
      </label>

      <SearchInput
        placeholder={placeholder}
        bind:value={value}
        on:file={filePasted}
        on:submit={submit}
        disabled={disabled}
        />

      {#if showPreview}
        <section class="preview" transition:slide={{ duration: 200 }}>
          <a
            class="code"
            class:submitting
            class:copied
            href={fullLink}
            target="_blank"
            >
            {link}
          </a>

          <div on:click={copyToClipboard} class="copy">
            <Copy />
          </div>
        </section>
      {/if}
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

  :global(label) {
    margin-bottom: 0.2em !important;
  }

  :global(.form button) {
    font-size: 0.8em;
  }

  .editor-container {
    font-size: 0.5em;
  }

  .preview {
    font-size: clamp(1.3rem, 6vw, 3rem);
    margin-bottom: 2.5em;
    font-family: Georgia, 'Times New Roman', Times, serif;
    letter-spacing: -0.02em;
    display: flex;
    align-self: center;
    gap: 0.5em;

    a {
      color: var(--accent-color);
      transition: color 0.2s ease;
      position: relative;

      &:before, &:after {
        content: 'here\'s your link --^';
        position: absolute;
        white-space: nowrap;
        top: calc(100% + 0.5em);
        right: calc(50% - 2.5em);
        font-size: 0.5em;
        color: var(--foreground-75);
      }

      &:after {
        content: '<-- copy to clipboard';
        left: calc(100% + 3.6em);
        top: 0.8em;
        font-size: 0.4em;
      }

      &.copied:after {
        content: '<-- copied!';
      }

      &.submitting {
        pointer-events: none;
        color: var(--foreground-10);
      }
    }
  }

  .copy {
    --dimensions: 0.6em;
    height: var(--dimensions);
    width: var(--dimensions);
    transition: transform 0.1s ease;
    color: var(--foreground-50);
    transform-origin: 50% 90%;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
      color: var(--foreground-75);
    }
  }

  label {
    font-size: 1.3rem;
    margin-bottom: 1em;
  }
</style>
