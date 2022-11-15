<script>
  import { post } from '~/api/post'
  import KeyLength from '~/components/KeyLength.svelte'
  import TTL from '~/components/TTL.svelte'
  import { keyLength, postResults, textTTL } from '~/stores'
  import { pageTitle } from '~/utils/pageTitle'
  import PostResults from '../create/PostResults.svelte'
  import Editor from './Editor.svelte'

  const PLACEHOLDER_SHUFFLE_SPEED = 2000
  const DEFAULT_PLACEHOLDER = '// advanced editor'

  let value = ''
  let placeholder = DEFAULT_PLACEHOLDER
  let id = ''
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
    }).then(
      () => placeholder = DEFAULT_PLACEHOLDER
    )
  }
</script>

<!-- HEAD -->
<svelte:head>
  <title>{pageTitle('advanced editor')}</title>
  <meta name="description" content="Write your own content, then get it live on the web in under a second!" />
</svelte:head>

<!-- MARKUP -->
<section class="form">
  <section class="controls">
    <KeyLength />
    <TTL />
  </section>

  <div class="editor-and-submit">
    {#key submitting}
      <Editor
        placeholder={placeholder}
        bind:value={value}
        on:files={e => save(e.detail)}
        on:submit={() => save(value)}
        rows={6}
        disabled={submitting}
        />
    {/key}

    <button type="submit" disabled={disabled || submitting} on:click={() => save(value)}>
      Submit
      {#if detectedType}
        (as {detectedType})
      {/if}
    </button>
  </div>
</section>

{#if $postResults?.entries}
  <PostResults />
{/if}

<!--
<h2>Advanced Editor</h2>

<p>
  In the beginning, I'm allowing exactly two types of content: HTML and JSON.
</p>

<h3>HTML</h3>

<p>
  HTML content will be served back out as an HTML page.  This can be as simple or elaborate as you like (any valid HTML works)... use your imagination!
</p>

<h3>JSON</h3>

<p>
  If you write perfectly-formed JSON, you can get properly encoded JSON back out.  I'm not sure why you'd want to do this, but hey... why not?
</p> -->

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

  button {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    font-size: 1.2rem;
  }

  .editor-and-submit {
    display: flex;
    flex-flow: column;
    margin-bottom: 0.7em;
  }

  .form {
    font-size: clamp(1rem, 2vw, 1.2rem);
    display: flex;
    flex-flow: column;
    gap: 0.3em;
    margin-bottom: 0.1em;
  }
</style>
