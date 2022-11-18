<script>
  import { VERSION } from '~/constants'
  import weighted from 'weighted'

  export let showVersion = false

  const taglines = {
    // 'flash drive for Planet Earth': 200,
    [`Planet Earth's new flash drive`]: 200,
    'single-step file-sharing': 20,
    'a burner phone meets Dropbox': 10,
    'the way Kevin goes rapidly bankrupt': 1,
    'just another excuse to use magenta': 1,
  }

  const tagline = weighted.select(taglines) || ''
</script>

<!-- MARKUP -->
<div class="brand">
  <a href="/">
    <slot>
      <div class="main">
        <span>it<strike>t</strike>y<small>.sh</small></span>
        <strong class="alpha">
          alpha
          {#if showVersion}
          <span class="version">
            v{VERSION}
          </span>
        {/if}
        </strong>

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
    font-size: clamp(0.6rem, 1vw, 0.9rem);
  }

  .main {
    font-size: 1.5em;
    z-index: -1;
    position: relative;
    display: flex;
    align-items: baseline;
    gap: 0.1em;
  }

  .secondary {
    font-size: 0.5em;
    letter-spacing: -0.02em;
    color: var(--foreground-color);
    margin-top: -0.25em;
    z-index: 2;
  }

  // .version {
  //   font-size: 0.3em;
  //   letter-spacing: -0.01em;
  //   color: var(--foreground-25);
  // }

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

  .alpha {
    // font-size: 0.4em;
    font-weight: 400;
    letter-spacing: -0.01em;
    // text-transform: uppercase;
    color: var(--foreground-75);
    font-size: 0.56em;

    background-color: var(--foreground-75);
    color: var(--background-95);
    padding: 0.2em 0.4em;
    font-size: 0.22em;
    border-radius: 0.2em;
    position: relative;
    bottom: 0.3em;
  }
</style>
