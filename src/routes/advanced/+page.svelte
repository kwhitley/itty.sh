<script>
  import KeyLength from '~/components/KeyLength.svelte'
  import TTL from '~/components/TTL.svelte'
  import { api } from '~/api'
  import { keyLength, textTTL } from '~/stores'
  import Preview from '../create/Preview.svelte'
  import Editor from './Editor.svelte'

  const PLACEHOLDER_SHUFFLE_SPEED = 2000

  let value = ''
  let placeholder = '// advanced editor'
  let id = ''
  let submitting = false

  // REACTIVE BITS
  $: disabled = submitting || !value
  $: detectedType = detectType(value)

  const detectType = payload => {
    if (typeof payload !== 'string') return ''

    if (payload.match(/(^<)|(<\w+>)|(<\/?\w+>)/gi)) return 'text/html'

    // if (payload.match(/^[\{\[]/)) return 'application/json'

    // if (payload.length) return 'function'

    return ''
  }

  // SAVE PAYLOAD
  const save = async (payload, as = '') => {
    submitting = true
    value = ''

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

    submitting = false
  }
</script>

<!-- MARKUP -->
<section class="form">
  <section class="controls">
    <KeyLength />
    <TTL />
  </section>

  <div class="editor-and-submit">
    <Editor
      placeholder={placeholder}
      bind:value={value}
      on:file={e => save(e.detail)}
      on:submit={() => save(value)}
      rows={10}
      disabled={submitting}
      />

    <button type="submit" disabled={disabled} on:click={() => save(value)}>
      Submit
      {#if detectedType}
        (as {detectedType})
      {/if}
    </button>
  </div>
</section>

<Preview id={id} submitting={submitting} />

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

    & .editor {
      border-bottom-left-radius: 0;
    }
  }

  .editor-container {
    font-size: 0.5em;
  }

  label {
    font-size: 1.3rem;
    margin-bottom: 1em;
  }

  .form {
    font-size: clamp(1rem, 2vw, 1.2rem);
    display: flex;
    flex-flow: column;
    gap: 0.3em;
    margin-bottom: 0.1em;
  }
</style>
