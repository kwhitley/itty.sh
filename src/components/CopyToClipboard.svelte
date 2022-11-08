<script>
  import Copy from '~/components/icons/Copy.svelte'

  export let content
  let copied = false

  // utility function to copy full link to clipboard
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content)
    copied = true
  }
</script>

<!-- MARKUP -->
<div
  on:click={copyToClipboard}
  class="copy"
  class:copied
  >
  <Copy />
</div>

<!-- STYLES -->
<style lang="scss">
  .copy {
    --dimensions: 0.6em;
    height: var(--dimensions);
    width: var(--dimensions);
    transition: transform 0.05s ease;
    color: var(--foreground-50);
    transform-origin: 50% 90%;
    cursor: pointer;
    display: flex;
    position: relative;

    &:hover {
      transform: scale(1.1);
      color: var(--foreground-75);
    }

    &.copied {

      &::after {

      color: var(--green);
        position: absolute;
        content: '✔︎';
        font-size: 1rem;
        left: 0.4em;
        top: -0.05em;
        text-shadow: 0 0 2px rgba(255,255,255,1);
      }
    }
  }
</style>
