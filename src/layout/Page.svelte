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
    flex: 1 100%;
    padding:  calc(var(--page-gutter) * 1.5) var(--page-gutter) 2rem;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin-bottom: 2rem;
    min-height: 100%;

    &.full, &.splash {
      // min-height: 90vh;
    }

    &.splash {
      // background-color: pink;
      // min-height: 90vh;

      & > div {
        // background-color: cyan;
        height: 80%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
      }
    }
  }

  :global(.constrained .page > div) {
    max-width: var(--max-page-width);
    width: 100%;
  }
</style>
