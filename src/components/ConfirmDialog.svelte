<script>
  import { createEventDispatcher } from 'svelte'
  import { fade, fly } from 'svelte/transition'

  export let isOpen = false
  export let title = 'Confirm'
  export let message = ''
  export let confirmText = 'Continue'
  export let cancelText = 'Cancel'

  const dispatch = createEventDispatcher()

  const confirm = () => {
    dispatch('confirm')
    isOpen = false
  }

  const cancel = () => {
    dispatch('cancel')
    isOpen = false
  }
</script>

{#if isOpen}
  <div class="dialog-overlay" transition:fade={{ duration: 200 }} on:click={cancel}>
    <div class="dialog" transition:fly={{ y: 20, duration: 200 }} on:click|stopPropagation>
      <h3>{title}</h3>
      <div class="message">{@html message}</div>
      <div class="buttons">
        <button class="cancel" on:click={cancel}>{cancelText}</button>
        <button class="confirm" on:click={confirm}>{confirmText}</button>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 2em;
  }

  .dialog {
    background: var(--background-color);
    border: 1px solid var(--foreground-25);
    border-radius: 0.5em;
    padding: 2em;
    max-width: 500px;
    width: 100%;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  }

  h3 {
    margin: 0 0 1em 0;
    font-size: 1.3em;
    font-weight: 600;
    color: var(--foreground-color);
  }

  .message {
    margin-bottom: 2em;
    line-height: 1.5;
    color: var(--foreground-75);
  }

  .buttons {
    display: flex;
    gap: 1em;
    justify-content: flex-end;
  }

  button {
    padding: 0.7em 1.5em;
    font-size: 1em;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid var(--foreground-25);
    background: transparent;
    color: var(--foreground-color);

    &:hover {
      background: var(--foreground-10);
    }

    &.confirm {
      background: var(--blue);
      color: var(--background-color);
      border-color: var(--blue);

      &:hover {
        opacity: 0.9;
      }
    }
  }

  :global(.dialog .highlight) {
    color: var(--blue);
    font-weight: 600;
  }
</style>