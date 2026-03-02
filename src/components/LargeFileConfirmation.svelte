<script>
  import { createEventDispatcher } from 'svelte'
  import { fade, fly } from 'svelte/transition'

  export let isOpen = false
  export let fileSize = 0
  export let fileDescription = ''
  export let originalTTL = ''
  export let adjustedTTL = ''

  const dispatch = createEventDispatcher()

  const formatFileSize = (bytes) => {
    const mb = bytes / (1024 * 1024)
    return mb.toFixed(1) + ' MB'
  }

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
      <h3>Large File Storage Limit</h3>

      <div class="message">
        <p>
          The file you're uploading is <span class="highlight">{formatFileSize(fileSize)}</span>,
          which is {fileDescription}.
        </p>

        <div class="ttl-adjustment">
          <div class="arrow-container">
            <div class="ttl-box original">
              <span class="label">Current</span>
              <span class="value">{originalTTL}</span>
            </div>

            <svg class="arrow" viewBox="0 0 24 24" width="32" height="32">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" fill="currentColor"/>
            </svg>

            <div class="ttl-box adjusted">
              <span class="label">Adjusted</span>
              <span class="value">{adjustedTTL}</span>
            </div>
          </div>
        </div>

        <p class="explanation">
          To manage storage efficiently, the availability period will be reduced.
        </p>

        <p class="question">
          Would you like to continue with the shorter availability period?
        </p>
      </div>

      <div class="buttons">
        <button class="cancel" on:click={cancel}>Cancel upload</button>
        <button class="confirm" on:click={confirm}>Upload with shorter availability</button>
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
    line-height: 1.6;
    color: var(--foreground-75);

    p {
      margin: 0 0 1em 0;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .explanation {
      color: var(--foreground-50);
      font-size: 0.95em;
    }

    .question {
      font-weight: 500;
      color: var(--foreground-color);
      margin-top: 1.5em;
    }
  }

  .highlight {
    color: var(--blue);
    font-weight: 600;
  }

  .ttl-adjustment {
    margin: 1.5em 0;
    padding: 1.5em;
    background: var(--foreground-5);
    border-radius: 0.3em;
    display: flex;
    justify-content: center;
  }

  .arrow-container {
    display: flex;
    align-items: center;
    gap: 1.5em;
  }

  .ttl-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5em;
    padding: 1em 1.5em;
    border-radius: 0.3em;
    background: var(--background-color);
    border: 1px solid var(--foreground-15);
    min-width: 100px;

    .label {
      font-size: 0.8em;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--foreground-50);
      font-weight: 600;
    }

    .value {
      font-size: 1.2em;
      font-weight: 600;
      color: var(--foreground-color);
    }

    &.adjusted {
      border-color: var(--blue);
      background: var(--blue-10, rgba(0, 123, 255, 0.05));

      .value {
        color: var(--blue);
      }
    }
  }

  .arrow {
    color: var(--foreground-50);
    flex-shrink: 0;
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
    border-radius: 0.25em;

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

  @media (max-width: 480px) {
    .arrow-container {
      flex-direction: column;
      gap: 1em;
    }

    .arrow {
      transform: rotate(90deg);
    }

    .ttl-box {
      width: 100%;
      max-width: 200px;
    }
  }
</style>