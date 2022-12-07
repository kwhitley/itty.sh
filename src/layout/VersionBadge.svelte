<script>
  import { VERSION } from '~/constants'

  export let type = ''
</script>

<!-- MARKUP -->
<span class="version">
  {type} v{VERSION}
</span>

<!-- STYLES -->
<style lang="scss">
  .version {
    font-weight: 400;
    letter-spacing: -0.01em;
    font-size: 0.56em;
    background-color: var(--foreground-75);
    color: var(--background-color);
    padding: 0.2em 0.4em;
    font-size: 0.22em;
    border-radius: 0.2em;
    position: relative;
    bottom: 0.3em;
  }
</style>
