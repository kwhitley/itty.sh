<script>
  import { VERSION } from '~/constants'

  export let showVersion = false
</script>

<!-- MARKUP -->
<div class="brand">
  <a href="/">
    <slot>
      <div class="main">it<strike>t</strike>y<small>.sh</small></div>
      <div class="secondary">link-shortening for the 21st century</div>
    </slot>
  </a>

  {#if showVersion}
    <div class="version">
      v{VERSION}
    </div>
  {/if}
</div>

<!-- STYLES -->
<style lang="scss">
  .brand {
    align-self: center;
    padding: 0.15rem 0;
  }

  .main {
    font-size: 1.5em;
    z-index: 1;
    position: relative;
  }

  .secondary {
    font-size: 0.5em;
    letter-spacing: -0.02em;
    color: var(--foreground-color);
    margin-top: -0.6em;
    z-index: -1;
  }

  .version {
    font-size: 0.75rem;
    opacity: 0.6;
    align-self: center;
    margin-top: var(--version-offset);
    margin-bottom: calc(-1 * var(--version-offset));

    &:hover {
      opacity: 1;
    }
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
