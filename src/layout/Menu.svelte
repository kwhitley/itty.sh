<script>
  import { slide } from 'svelte/transition'
  import { headerIsOpen } from '~/stores'

  export let horizontal = true
  export let open = false
</script>


<section>
  {#if open}
    <nav transition:slide={{ duration: 200 }} class:horizontal>
      <slot />
    </nav>
  {/if}
</section>

<!-- STYLES -->
<style lang="scss">
  section {
    flex: 1 100%;
    display: flex;
    flex-flow: column;
    align-items: flex-end;

    @media screen and (max-width: 500px) {
      font-size: 0.9em;
    }
  }

  nav {
    display: flex;
    column-gap: 1.2em;
    row-gap: 0.8em;
    align-items: center;
    transition: all 0.2s ease-in-out;
    flex-flow: row wrap;
    justify-content: flex-end;

    &.horizontal {
      row-gap: 0.8em;
    }
  }

  :global(header nav a) {
    color: var(--foreground-color);
    text-decoration: none !important;
    line-height: 0.9em;
    text-align: right;
    white-space: nowrap;

    &:hover:not(.active) {
      opacity: 0.7;
    }
  }

  :global(header nav a.active) {
    color: var(--accent-color);
    border-bottom: var(--navlink-border) solid var(--accent-color);
    margin-bottom: calc(-1 * var(--navlink-border));
    text-decoration: none;

    cursor: default;
    pointer-events: none;
  }
</style>
