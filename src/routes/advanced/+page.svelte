<script>
  import Editor from '~/components/Editor.svelte'
  import KeyLength from '~/components/KeyLength.svelte'
  import { api } from '~/ity.sh/api'
  import Page from '~/layout/Page.svelte'
  import { keyLength } from '~/stores'
  import Preview from '../Preview.svelte'

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

    await api.post(`/create?length=${$keyLength}&as=${as}`, payload)
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

<Page>
  <main>
    <KeyLength />

    <section class="form">
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

      <Preview id={id} submitting={submitting} />
    </section>


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
    </p>

    <!-- <h3>Functions (JavaScript)</h3>

    <p>
      With itty.sh, you can create a globally-available, low-latency edge function without *any* of the setup of traditional PaaS providers.
    </p>

    <p>
      Simply write the <em>body</em> of a JavaScript function with access to the globals <strong>request</strong>, and <strong>context</strong>.  A
    </p>

    <ul>
      <li><strong>request</strong> - The full Request object (as enhanced by itty-router) seen by the function (new each request).  This includes the method (yes, you can use any HTTP method against your single endpoint), full path, request body, etc.</li>
      <li><strong>context</strong> - An object containing a selection of tools to help you along your journey:
        <ul>
          <li><strong>router</strong> - a pre-configured <a href="https://npmjs.com/package/itty-router">itty-router</a> for splitting your endpoint into multiple endpoints.  You can embed an entire API in there.</li>
          <li><strong>json</strong> - helper function from <a href="https://npmjs.com/package/itty-router-extras">itty-router-extras</a>.  Accepts any standard object and returns a JSON Response.</li>
        </ul>
      </li>
    </ul> -->
  </main>
</Page>

<!-- STYLES -->
<style lang="scss">
  main {
    display: flex;
    flex-flow: column;
    height: 100%;
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
</style>
