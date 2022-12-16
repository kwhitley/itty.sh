<script>
  import Copy from '~/components/icons/Copy.svelte'
  import { tooltip } from '~/actions/tooltip'
  import { toast } from '~/services/toast'

  export let content
  let copied = false

  // utility function to copy full link to clipboard
  const copyToClipboard = async (e) => {
    e.stopPropagation()
    await navigator.clipboard.writeText(content)
    copied = true

    toast(`Copied link to clipboard.`, { duration: '2 seconds' })
  }
</script>

<!-- MARKUP -->
<section>
  <div on:click={copyToClipboard} class="copy" class:copied>
    <Copy />
  </div>

  <div class="copy-slot">
    <slot />
  </div>
</section>

<!-- STYLES -->
<style lang="scss">
  section {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

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
  }

  .copy-slot {
    font-size: 1.1rem;
    white-space: nowrap;

    @media screen and (max-width: 35em) {
      display: none;
    }
  }
</style>
