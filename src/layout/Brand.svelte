<script>
  import { VERSION } from '~/constants'
  import { randomItem } from 'supergeneric/randomItem'

  export let showVersion = false

  const taglines = [
    'if a burner phone and Dropbox were to have a baby...',
    'a flash drive for Planet Earth',
    'zero-step file-sharing',
    'share files using disappearing ink'
  ]

  const tagline = randomItem(taglines) || ''
</script>

<!-- MARKUP -->
<div class="brand">
  <a href="/">
    <slot>
      <div class="main">it<strike>t</strike>y<small>.sh</small>
        {#if showVersion}
          <span class="version">
            v{VERSION}
          </span>
        {/if}
      </div>
      <div class="secondary">{tagline}</div>
    </slot>
  </a>
</div>

<!-- STYLES -->
<style lang="scss">
  .brand {
    align-self: center;
    padding: 0.15rem 0 0.6rem;
    font-size: clamp(0.6rem, 2.5vw, 0.9rem);
  }

  .main {
    font-size: 1.5em;
    z-index: -1;
    position: relative;
  }

  .secondary {
    font-size: 0.55em;
    letter-spacing: -0.02em;
    color: var(--foreground-color);
    margin-top: -0.25em;
    z-index: 2;
  }

  .version {
    font-size: 0.4em;
    font-size: 0.35em;
    opacity: 0.7;
    margin-left: -0.4rem;
    letter-spacing: -0.03em;
  }

  a {
    font-size: var(--brand-size);
    letter-spacing: -0.05em;
    transition: color 0.2s ease;
    display: inline-block;
    transform-origin: 0% 50%;
    color: var(--brand-color);

    &:hover {
      color: var(--accent-color);
      text-decoration: none;
      opacity: 0.8;
    }
  }

  small {
    font-size: 0.7em;
    font-size: 1em;
    font-style: normal;
    letter-spacing: -0.05em;
    display: inline-block;
    margin-left: -0.1em;
    color: var(--foreground-75);
  }
</style>
