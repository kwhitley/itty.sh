<script>
  import { navlink } from 'svelte-navlink-action'
  import { fly } from 'svelte/transition'
  import Footer from '~/layout/Footer.svelte'
  import Nav from '~/layout/Nav.svelte'
  import '~/styles/app.scss'
  import { DEV } from '~/constants'
	import { pageTitle } from '~/utils/pageTitle'
	import Toaster from '~/components/Toaster.svelte'

  // DEFINES IF THE PAGE IS WIDTH-CONSTRAINED
  let constrained = true
  let year = new Date().getFullYear()

  // DATA FROM +layout.js
  export let data
</script>

<svelte:head>
  <link rel="icon" type="image/svg" href="/favicon.png">
  <link rel="preconnect" href="https://ity.sh" crossorigin>
  <title>{pageTitle()}</title>
  <meta name="description" content="Super-secret, secret project that shall remain secret until it's no longer a secret." />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
</svelte:head>

<main>
  <Nav version horizontal constrained>
    <a href="/stats" use:navlink>Stats</a>
    <a href="/about" use:navlink>About</a>
    <!-- <a href="/create" use:navlink>Create</a>
    <a href="/advanced" use:navlink>Editor</a> -->
    <!-- <a href="/about" use:navlink>What is This?</a> -->
  </Nav>

  <section class="page-container" class:constrained>
    {#key data.pathname}
      <div
        class="page"
        in:fly={{ x: 100, duration: 200, delay: 110 }}
        out:fly={{ x: -100, duration: 100 }}
        >
        <slot />
      </div>
    {/key}
  </section>

  <Footer constrained={constrained} centered />
</main>

<Toaster />

<style lang="scss">
  main {
    display: flex;
    flex-flow: column;
    min-height: 100%;
    position: relative;
    overflow: hidden;

    section {
      flex: 1;
      display: flex;
      flex-flow: row wrap;
      align-self: center;
      max-width: var(--max-width);
      width: 100%;
      justify-content: center;
      padding: 3rem var(--page-inset);
    }

    .page {
      flex: 1;
      max-width: var(--max-page-width);
    }
  }
</style>
