<script>
  import { generateHash } from 'supergeneric/generateHash'
  import { random } from 'supergeneric/random'
  import { slide } from 'svelte/transition'
  import Copy from '~/components/icons/Copy.svelte'
  import QRCode from '~/components/QRCode.svelte'
  import CopyToClipboard from '~/components/CopyToClipboard.svelte'
  import { onInterval } from '~/utils/onInterval'
  import { DOMAIN, PATH } from '~/api'

  export let key
  export let submitting
  let copied = false

  $: link = `${DOMAIN}/${key}`
  $: fullLink = `${PATH}/${key}`
  $: finalKey = !submitting && key
</script>

<!-- MARKUP -->
{#if key}
  <main class="preview">
    <section class="preview-link">
      <a
        class="code"
        class:submitting
        class:copied
        href={fullLink}
        target="_blank"
        >
        <span class:hideOnMobile={link.length > 20}>{DOMAIN + '/'}</span>{key}
      </a>

      <CopyToClipboard content={fullLink}>
        &lt;-- copy
      </CopyToClipboard>
    </section>

    <QRCode key={finalKey} />
</main>
{/if}

<!-- STYLES -->
<style lang="scss">
  .preview {
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 1.5em;
    margin-bottom: 1em;
    height: clamp(10em, 100vw, 26em);
  }

  .preview-link {
    font-size: clamp(1.3rem, 6vw, 3rem);
    font-family: Georgia, 'Times New Roman', Times, serif;
    letter-spacing: -0.02em;
    display: flex;
    align-items: center;
    align-self: center;
    gap: 0.5em;
    margin-bottom: 0.4em;

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
        font-size: clamp(1rem, 0.5em, 2rem);
        color: var(--foreground-75);
      }

      &.submitting {
        pointer-events: none;
        color: var(--foreground-25);
      }
    }
  }

  @media screen and (max-width: 35em) {
    .hideOnMobile {
      display: none;
    }
  }
</style>
