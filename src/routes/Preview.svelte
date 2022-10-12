<script>
  import { generateHash } from 'supergeneric/generateHash'
  import { random } from 'supergeneric/random'
  import { slide } from 'svelte/transition'
  import Copy from '~/components/icons/Copy.svelte'
  import { onInterval } from '~/utils/onInterval'
  import { PREFIX, PATH } from '~/ity.sh/api'

  export let id
  export let submitting
  let copied = false

  $: link = `${PREFIX}/${id}`
  $: fullLink = `${PATH}/${id}`

  const obfuscate = () => {
    const newLetter = generateHash(1)
    const target = random(0, id.length - 1)

    id = id.split('').map((v, i) => i === target ? newLetter : v).join('')
  }

  // id shuffler
  const idShuffler = onInterval(obfuscate, 5)
  $: if (submitting && id) {
    idShuffler.start()
  } else {
    idShuffler.stop()
  }

  $: if (id) {
    copied = false
  }

  // utility function to copy full link to clipboard
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(fullLink)
    copied = true
  }
</script>

<!-- MARKUP -->
{#if id}
  <section class="preview" in:slide={{ duration: 100 }}>
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

<!-- STYLES -->
<style lang="scss">
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
        color: var(--foreground-25);
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
</style>
