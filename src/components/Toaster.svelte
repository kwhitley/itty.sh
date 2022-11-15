<script>
  import { toastIsOpen, toastMessage, toastOptions } from '~/services/toast'
</script>

<!-- MARKUP -->
<section class={`toast-drawer ${$toastOptions.type}`} class:open={$toastIsOpen}>
  <div class="inner">
    {$toastMessage}
  </div>
</section>

<!-- STYLES -->
<style lang="scss">
  .toast-drawer {
    position: fixed;
    left: 0;
    right: 0;
    padding: 1.5em var(--page-inset);
    color: var(--background-color);
    background-color: var(--foreground-color);
    transition: bottom 0.4s ease;
    box-shadow: 0 0 2em rgba(0,0,0,0.2);
    overflow: hidden;
    box-sizing: border-box;
    bottom: -10em;
    display: flex;
    justify-content: center;

    &.open {
      bottom: -1px;
    }

    &.error {
      background-color: #c62c2c;
    }
  }

  .inner {
    width: 100%;
    max-width: var(--max-page-width);
    line-height: 1.4em;
  }
</style>
