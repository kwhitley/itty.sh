<script>
  import KeyLength from '~/components/KeyLength.svelte'
  import TTL from '~/components/TTL.svelte'
  import Intro from './Intro.svelte'
  import Preview from './Preview.svelte'
  import SimpleInput from './SimpleInput.svelte'
  import PostResults from './PostResults.svelte'
  import { postResults } from '~/stores'

  let id = ''
  let submitting = false
</script>

<section class="form">
  <section class="controls">
    <KeyLength />
    <TTL />
  </section>

  <SimpleInput
    bind:id={id}
    bind:submitting={submitting}
    />
</section>

{#if $postResults?.entries}
  <PostResults />
{/if}

<Preview
  id={id}
  submitting={submitting}
  />

<style lang="scss">
  main {
    display: flex;
    flex-flow: column;
  }

  .controls {
    margin-bottom: 1em;
  }

  :global(#page-contents) {
    justify-self: center;
    gap: 1.3rem;
  }

  .form {
    font-size: clamp(1rem, 2vw, 1.2rem);
    display: flex;
    flex-flow: column;
    gap: 1rem;
    margin-bottom: 0.1em;
  }
</style>
