<script>
  import { fade, slide } from 'svelte/transition'
  import { postResults } from '~/stores'
  import Preview from './Preview.svelte'
  import { PREFIX, PATH } from '~/api'
  import CopyToClipboard from '~/components/CopyToClipboard.svelte'
  import Progress from '~/components/Progress.svelte'

  let expandedIndex = undefined

  $: entries = $postResults?.entries || []
  $: shortPath = PATH.replace(/https?:\/\//, '')
  $: singleEntry = entries.length === 1 ? entries[0] : false
  $: error = $postResults?.errors?.length
  $: expandedItem = entries[expandedIndex]
  $: completed = entries.filter(e => !e.submitting && !e.error)

  const toggleExpanded = (index) => () => { expandedIndex = (expandedIndex === index) ? undefined : index }
</script>

<!-- MARKUP -->

{#if error}
  <h3 class:error>
    Oops, something went wrong...
  </h3>
{/if}

{#if singleEntry}
  {#key singleEntry.key}
    <Preview id={singleEntry.key} />
  {/key}
{:else}
  <Progress min={0} max={entries.length} value={completed.length} />

  <section>
    {#each entries as { filename, url, submitting, isDone, key, error }, index}
      <article on:click={toggleExpanded(index)}>

        <!-- <div
          class="expander"
          class:expanded={expandedIndex === index}
          >
        </div> -->
        <div class="filename">{filename || ''}</div>

        {#if submitting}
          <div class="loading">sending...</div>
        {:else}
          {#if error}
            <div class="loading">{error || 'Something went wrong...'}</div>
          {:else}
            <div class="link" in:fade={{ duration: 100 }}>
              <a
                href={url}
                target="_blank"
                >
                {shortPath}/{key}
              </a>
            </div>
            <div class="copy" in:fade={{ duration: 100 }}>
              <CopyToClipboard content={url} />
            </div>
          {/if}
        {/if}

        {#if expandedIndex === index}
          <!-- <div in:slide={{ duration: 100 }}>
            <Preview id={key} />
          </div> -->
        {/if}
      </article>
    {/each}
  </section>
{/if}


<!-- <pre>
  { JSON.stringify($postResults, null, 2) }
</pre> -->

<!-- STYLES -->
<style lang="scss">
  .error {
    color: var(--red);
  }

  .expander {
    flex: 0 1em;
    cursor: pointer;
    font-size: 1.3em;
    padding-left: 0.2em;
    padding-right: 0.8em;
    position: relative;

    &:hover {
      color: var(--accent-color);
    }
  }

  .expander::before {
    top: -0.2em;
    position: absolute;
    display: block;
    content: '▹';
    transition: rotate 0.1s ease;
  }

  .expander.expanded::before {
    rotate: 90deg;
  }

  section {
    display: flex;
    flex-flow: column;
    margin-top: 1.5em;
  }

  article {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: 0.5rem 0.7rem;
    row-gap: 0.2em;
    column-gap: 1em;
    cursor: pointer;
    min-height: 2.5rem;

    &:not(:last-child) {
      border-bottom: 1px solid var(--foreground-10);
    }

    &:hover {
      background-color: var(--foreground-5);
    }
  }

  .link {
    flex: 0;
    justify-self: flex-end;
    font-size: 1.1em;
  }

  .filename {
    flex: 1;
    text-align: left;
    user-select: none;

    @media screen and (max-width: 40em) {
      flex: 1 100%;
      font-size: 0.9em;
    }
  }

  .copy {
    font-size: 1.5em;
    padding: 0.2rem 0.3rem 0 0;
  }

  a {
    color: var(--accent-color);
  }


  em {
    font-family: sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 1.2em;
    color: var(--accent-color);
  }

  small {
    font-size: 0.65em;
    margin-left: 0.2em;
  }

  .loading {
    color: var(--foreground-25);
  }
</style>
