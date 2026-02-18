<script>
  import GitHub from '~/components/icons/GitHub.svelte'
  import Twitter from '~/components/icons/Twitter.svelte'
  import Discord from '~/components/icons/Discord.svelte'

  export let constrained = false
  export let sticky = false
  export let centered = false

  let year = new Date().getFullYear()
</script>

<!-- MARKUP -->
<footer class:sticky>
  <section class="split" class:constrained class:centered>
    <nav>
      <div class="copywrite">
        &copy; {year} Itty. All rights reserved.
      </div>

      <div class="links">
        <a href="/terms">Terms &amp; Conditions</a>
        <a href="/privacy">Privacy Policy</a>

        <div class="social">
          <a href="https://twitter.com/kevinrwhitley">
            <Twitter />
          </a>

          <a href="https://discord.gg/aTunhByeNY">
            <Discord />
          </a>

          <a href="https://github.com/kwhitley">
            <GitHub />
          </a>
        </div>
      </div>
    </nav>
  </section>
</footer>

<!-- STYLES -->
<style lang="scss">
  footer {
    position: relative;
    padding: 2rem var(--page-inset) 2rem;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    font-size: 0.85em;
    color: var(--foreground-75);
    background-color: var(--foreground-5);
    margin-top: 3rem;

    .links {
      display: flex;
      flex-flow: row wrap;
      row-gap: 0.4rem;
      column-gap: 1rem;
      align-items: flex-end;
      justify-content: flex-end;
      text-align: right;
    }

    section {
      // border-top: 1px solid var(--foreground-25);
    }

    &.sticky {
      position: fixed;
      bottom: 0;
      width: 100%;
    }
  }

  .split {
    flex-flow: row-reverse wrap;
  }

  section {
    flex: 1;
    display: flex;
    flex-flow: row wrap;
    // align-items: space-between;
    align-items: flex-end;
    justify-content: space-between;
    // background-color: cyan;
    row-gap: 0.8em;
    column-gap: 2em;

    & > * {
      // background-color: red;
      flex: 1 50%;
    }

    &.constrained {
      max-width: var(--max-page-width);
    }

    &.centered {
      // text-align: center;
      // display: block;
    }
  }

  .social {
    flex: 1 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: flex-end;
    gap: 1em;
    font-size: 0.8rem;
    margin-top: 0.5rem;

    > * {
      color: var(--foreground-75);
      display: block;
      height: 2em;
      width: 2em;
      transition: all 0.2s ease;

      &:hover {
        color: var(--foreground-color);
      }
    }
  }

  nav {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    column-gap: 2rem;
    font-size: 0.8em;
    line-height: 1em;

    & > * {
      flex: 1;
    }

    a {
      color: var(--foreground-color);

      &:hover {
        color: var(--accent-color);
      }
    }

    // & > * {
    //   flex: 1 100%;
    // }
  }
</style>
