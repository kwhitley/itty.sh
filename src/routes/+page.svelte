<script>
  import { post } from '~/api/post'
  import KeyLength from '~/components/KeyLength.svelte'
  import TTL from '~/components/TTL.svelte'
  import Disclaimer from '~/components/Disclaimer.svelte'
  import { keyLength, postResults, textTTL } from '~/stores'
  import { pageTitle } from '~/utils/pageTitle'
  import PostResults from './PostResults.svelte'
  import Editor from './Editor.svelte'
  import ManualUploadButton from './ManualUploadButton.svelte'
  import { draggable } from '~/actions/draggable'

  const PLACEHOLDER_SHUFFLE_SPEED = 2000
  const DEFAULT_PLACEHOLDER = `THINGS YOU CAN DO:

  - drag & drop files
  - store written content, HTML, JSON, etc.
  - create redirects (enter a link)
  - save screenshots (paste from the clipboard)`

  let value = ''
  let placeholder = DEFAULT_PLACEHOLDER
  let id = ''
  let dragOver = false
  $: submitting = $postResults?.submitting

  // REACTIVE BITS
  $: disabled = submitting || !value
  $: detectedType = detectType(value)

  const detectType = payload => {
    if (typeof payload !== 'string') return ''

    if (payload.match(/(^<)|(<\w+>)|(<\/?\w+>)/gi)) return 'text/html'
  }

  // SAVE PAYLOAD
  const save = async (payload, as = '') => {
    const isArrayOfFiles = Array.isArray(payload) && payload[0] instanceof File
    value = ''
    dragOver = false

    // console.log('payload', payload)

    // auto-detect type if not explicity passed
    if (!as) {
      as = detectType(payload)

      as = as ? `&as=${as}` : ''
    }

    post(isArrayOfFiles ? payload : [payload], {
      ttl: $textTTL.replace(/\s/, ''),
      length: $keyLength,
      as,
    }).then(
      () => placeholder = DEFAULT_PLACEHOLDER
    )
  }

  let buttonMessage = 'Save'

  $: {
    buttonMessage = 'Save'

    if (detectedType) {
      buttonMessage += ` as ${detectedType}`
    }

    if (!value) buttonMessage = 'Step 1 - Drag/type stuff into the box'

    if (dragOver) buttonMessage = 'Drop Files to Upload'
    if (submitting) buttonMessage = 'Sending...'
  }
</script>

<!-- HEAD -->
<svelte:head>
  <title>{pageTitle('single-step file sharing')}</title>
  <meta name="description" content="Create itty links by dragging files, pasting from the clipboard, or writing content from scratch.  Try it today!" />
</svelte:head>

<!-- MARKUP -->
<section class="form">
  <section class="controls">
    <KeyLength />
    <TTL />
  </section>

  <div class="editor-and-submit"
    use:draggable={{ enabled: false }}
    on:dragenter={() => dragOver = true}
    on:dragleave={() => dragOver = false}
    >
    {#key submitting}
      <Editor
        placeholder={placeholder}
        bind:value={value}
        on:files={e => save(e.detail)}
        on:submit={(e) => save(e?.detail || value)}
        rows={6}
        disabled={submitting}
        />
    {/key}

    <div class="button-group">
      <button type="submit" disabled={(disabled || submitting) && !dragOver} on:click={() => save(value)}>
        {buttonMessage}
      </button>

      {#if !dragOver}
        <ManualUploadButton on:files={e => save(e.detail)} />
      {/if}
    </div>
  </div>
</section>

{#if $postResults?.entries}
  <PostResults />
{:else}
  <div class="step-2">Step 2 - Get a link to your stuff</div>

  <Disclaimer />
{/if}

<!-- STYLES -->
<style lang="scss">
  :global(label) {
    margin-bottom: 0 !important;
  }

  :global(.editor-label) {
    margin-bottom: 0;
  }

  :global(.editor) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: 0;
  }

  .step-2 {
    font-size: 1.1rem;
    color: var(--foreground-25);
    text-align: center;
    margin: 1em 0 3em;
  }

  button {
    border-radius: 0;
  }

  .editor-and-submit {
    display: flex;
    flex-flow: column;
    margin-bottom: 2em;
    transition: all 0.1s ease;

    &.over {
      display: none;
    }
  }

  .form {
    font-size: clamp(1rem, 2vw, 1.2rem);
    display: flex;
    flex-flow: column;
    gap: 1.5em;
    margin-bottom: 0.1em;
  }

  :global(.editor-and-submit.over) {
    scale: 1.03;

    animation: jiggle 0.25s infinite;
    -webkit-animation: jiggle 0.25s infinite;
    -moz-animation-duration: 0.25s;
    -moz-animation-name: jiggle;
    -moz-animation-iteration-count: infinite;
    -webkit-transform: rotate(-0.5deg);
    -moz-transform: rotate(-0.5deg);
  }

  :global(.editor-and-submit.over textarea) {
    border-color: var(--accent-color);
  }

  :global(.editor-and-submit.over button) {
    background-color: var(--accent-color);
  }


  @media screen and (max-width: 20em) {
    .editor-and-submit {
      margin-left: calc(-1 * var(--page-gutter));
      margin-right: calc(-1 * var(--page-gutter));
    }

    .button-group {
      border-radius: 0;
    }

    :global(.editor-and-submit textarea) {
      border-radius: 0;
      border-left: 0;
      border-right: 0;
      background-color: var(--foreground-5);
      box-shadow: inset 0 2em 1em -2em rgba(0,0,0,0.4);
      border-color: var(--foreground-50);
    }
  }
</style>
