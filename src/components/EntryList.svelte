<script>
  import { random } from 'supergeneric/random'
  import { fade, fly } from 'svelte/transition'
  import { PATH } from '~/api'
  import CopyToClipboard from '~/components/CopyToClipboard.svelte'
  import QRCode from '~/components/QRCode.svelte'

  // exported variables
  export let items = []
  export let expired = false
  export let submitting = false

  // local variables
  let expandedIndex = undefined
  $: expandedItem = items[expandedIndex]

  // reactive bits
  $: shortPath = PATH.replace(/https?:\/\//, '')
  $: if (expired || submitting) {
      expandedIndex = undefined
    }

  const toggleExpanded = (key) => (index) => () => {
    if (key) {
      expandedIndex = (expandedIndex === index) ? undefined : index
    }
  }
</script>

<!-- MARKUP -->
{#if !expired}
  <section>
    {#each items as { filename, url, submitting, key, error, expires }, index}
      <article on:click={toggleExpanded(key)(index)} class:expired>
        <div class="filename" out:fly={{ x: -100, duration: random(150, 250), delay: random(0, 200) }}>{filename}</div>

        {#if submitting}
          <div class="loading">sending...</div>
        {:else}
          {#if error}
            <div class="loading">{error || 'Something went wrong...'}</div>
          {:else}
            <div class="link" in:fade={{ duration: 100 }} out:fly={{ x: 100, duration: random(100, 200), delay: random(50, 250) }}>
              <a
                href={url}
                target="_blank"
                on:click={(e) => e.stopPropagation()}
                >
                {shortPath}/{key}
              </a>
            </div>
            <div class="copy" in:fade={{ duration: 100 }} out:fade={{ duration: random(100, 200), delay: random(0, 100) }}>
              <CopyToClipboard content={url} />
            </div>
          {/if}
        {/if}

        <div class="details" class:open={expandedIndex === index}>
          {#if expandedIndex === index}
            <QRCode key={key} />
          {/if}
        </div>
      </article>
    {/each}
  </section>
{/if}

<!-- STYLES -->
<style lang="scss">
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

    &.expired {
      pointer-events: none;
    }

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

  .loading {
    color: var(--foreground-25);
  }

  .details {
    flex: 1 100%;
    height: 0;
    overflow: hidden;
    transition: all 0.1s ease;

    &.open {
      height: 20em;
    }
  }
</style>
