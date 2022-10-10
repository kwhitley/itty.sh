<script>
  import { navlink } from 'svelte-navlink-action'
  import Footer from '~/layout/Footer.svelte'
  import Nav from '~/layout/Nav.svelte'
  import GitHub from '~/components/icons/GitHub.svelte'
  import Twitter from '~/components/icons/Twitter.svelte'
  import '~/styles/app.scss'

  // DEFINES IF THE PAGE IS WIDTH-CONSTRAINED
  let constrained = true
  let year = new Date().getFullYear()
</script>

<svelte:head>
  <link rel="icon" type="image/svg" href="/favicon.png">
  <link rel="preconnect" href="https://api.itty.cards" crossorigin>
  <title>itty.sh</title>
  <meta name="description" content="Super-secret, secret project that shall remain secret until it's no longer a secret." />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <html lang="en" />
</svelte:head>

<main>
  <Nav version horizontal constrained>
    <div class="social">
      <a href="https://twitter.com/kevinrwhitley">
        <Twitter />
      </a>

      <a href="https://github.com/kwhitley">
        <GitHub />
      </a>
    </div>
  </Nav>

  <section class:constrained>
    <slot />
  </section>

  <Footer constrained={constrained} centered>
    &copy; {year} itty, LLC. All rights reserved.
  </Footer>
</main>

<style lang="scss">
  main {
    display: flex;
    flex-flow: column;
    min-height: 100%;
    overflow: scroll;

    section {
      flex: 1;
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
    }
  }

  small {
    font-size: 0.5em;
    letter-spacing: 0em;
    color: var(--foreground-25);
    top: -0.4rem;
    position: relative;
  }

  .social {
    flex: 0 5em;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    gap: 1em;
    font-size: 1rem;

    > * {
      color: var(--foreground-50);
      display: block;
      height: 2em;
      width: 2em;
      transition: all 0.2s ease;

      &:hover {
        color: var(--foreground-color);
      }
    }
  }
</style>
