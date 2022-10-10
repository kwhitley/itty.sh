<script>
  import { fade, fly } from 'svelte/transition'

  export let splash = false
  export let full = false
</script>

<main
  class="page"
  class:full
  class:splash
  >
  <div in:fly={{ x: 100, duration: 200, delay: 110 }} out:fly={{ x: -100, duration: 100 }}>
    <slot />
  </div>
</main>


<style lang="scss">
  main {
    width: 100%;
    // flex: 1 100%;
    flex: 1 100%;
    padding:  calc(var(--page-gutter) * 1.5) var(--page-gutter) 2rem;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin-bottom: 2rem;
    min-height: 100%;
    height: 100%;
    // background-color: cyan;

    &.splash {
      flex-flow: column;
      align-content: stretch;
      flex: 1;
      justify-self: center;
      align-self: center;

      & > div {
        align-self: center;
        // background-color: pink;
        display: flex;
        flex-flow: column;
        margin-bottom: 6em;
      }
    }
  }

  :global(.constrained .page > div) {
    max-width: var(--max-page-width);
    width: 100%;
  }
</style>
