<script>
  import KeyLength from '~/components/KeyLength.svelte'
  import TTL from '~/components/TTL.svelte'
  import Page from '~/layout/Page.svelte'
  import Intro from './Intro.svelte'
  import Preview from './Preview.svelte'
  import SimpleInput from './SimpleInput.svelte'
  import { textTTL } from '~/stores'

  let id = ''
  let submitting = false
</script>

<Page>
  <main id="page-contents">
    <KeyLength />
    <TTL />

    <section class="form">
      <SimpleInput
        bind:id={id}
        bind:submitting={submitting}
        />

      <Preview
        id={id}
        submitting={submitting}
        />
    </section>

    <Intro />
  </main>
</Page>

<style lang="scss">
  main {
    display: flex;
    flex-flow: column;
    // align-self: center;
  }

  :global(#page-contents) {
    justify-self: center;
  }

  .form {
    font-size: 2.5em;
    font-size: clamp(1rem, 5vw, 2.5rem);
    display: flex;
    flex-flow: column;
    gap: 0.3em;
    margin-bottom: 0.1em;
  }
</style>
