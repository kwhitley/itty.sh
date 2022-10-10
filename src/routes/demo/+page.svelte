<script>
  import { slide } from 'svelte/transition'
  import { onDestroy, onMount } from 'svelte'
  import Page from '~/layout/Page.svelte'
  import Editor from '~/components/Editor.svelte'
  import SearchInput from '~/components/SearchInput.svelte'
  import { randomItem } from 'supergeneric/randomItem'
  import { generateHash } from 'supergeneric/generateHash'
  import { random } from 'supergeneric/random'
  import { onInterval } from '~/utils/onInterval'
  import { api } from '~/ity.sh/api'
  import { error } from '@sveltejs/kit'

  const PREFIX = 'ity.sh'
  const PROTOCOL = 'https://'

  let value
  let placeholderOptions = [
    'enter a link',
    'enter some text',
    'paste an image',
    'write a function*',
  ]
  let placeholder
  let id = ''
  $: link = `${PREFIX}/${id}`
  $: fullLink = `${PROTOCOL}${PREFIX}/${id}`

  let submitting = false

  const obfuscate = () => {
    const newLetter = generateHash(1)
    const target = random(0, id.length - 1)

    id = id.split('').map((v, i) => i === target ? newLetter : v).join('')
  }

  const idShuffler = onInterval(obfuscate, 10)

  // side effect to shuffle id when submitting
  $: if (submitting && id) {
    idShuffler.start()
  } else {
    idShuffler.stop()
  }

  $: showPreview = id
  $: disabled = submitting || !value

  // shuffle function
  const shuffle = () => placeholder = randomItem(placeholderOptions)

  const { start, stop } = onInterval(shuffle, 1000)

  const submit = async () => {
    console.log('submitting')
    submitting = true
    const response = await api
                            .post('/create', value)
                            .catch(err => {
                              console.error('there was an error posting content')
                            })
    submitting = false
    value = ''
    id = response.id
  }

  const imagePasted = async e => {
    console.log('detected image pasted', e.detail)
    submitting = true
    value = ''
    placeholder = '(pasted image)'
    stop()

    await fetch(`${PROTOCOL}${PREFIX}/create`, { method: 'POST', body: e.detail })
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

  $: if (value) {
    stop()
  } else {
    start()
  }
</script>

<Page splash>


  <section class="form">
    <SearchInput
      placeholder={placeholder}
      bind:value={value}
      on:image={imagePasted}
      on:submit={submit}
      disabled={disabled}
      />

    <!-- <div class="editor-container">
      <Editor
        placeholder={placeholder}
        bind:value={value}
        on:image={imagePasted}
        disabled={submitting}
        />

        <button
          disabled={disabled}
          on:click={submit}
          >
          {#if submitting}
            Generating...
          {:else}
            generate a link
          {/if}
        </button>
    </div> -->



  </section>

  {#if showPreview}
    <section class="preview" transition:slide={{ duration: 200 }}>
      <a class="code" href={fullLink} target="_blank" class:submitting>{link}</a>
    </section>

    <!-- <button on:click={obfuscate}>
      obfuscate
    </button> -->
  {/if}
</Page>

<style lang="scss">
  .form {
    font-size: 2.5em;
    font-size: clamp(1rem, 5vw, 2.5rem);
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
    font-size: 3em;
    margin-top: 0.5em;
    font-family: Georgia, 'Times New Roman', Times, serif;
    letter-spacing: -0.02em;

    a {
      color: var(--accent-color);
      transition: all 0.2s ease;
      position: relative;

      &:before {
        content: 'here\'s your link --^';
        position: absolute;
        top: calc(100% + 1em);
        right: 5em;
        font-size: 0.5em;
        color: var(--foreground-75);
        // transition: opacity 0.1s ease;
      }

      &.submitting {
        pointer-events: none;
        color: var(--foreground-10);

        &:before {
          opacity: 0;
        }
      }


    }
  }
</style>
