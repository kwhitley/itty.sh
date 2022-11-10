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

    <div class="copywrite">
      <slot>
        &copy; {year} Itty Industries, Inc. All rights reserved.
      </slot>
    </div>
  </section>
</footer>

<!-- STYLES -->
<style lang="scss">
  footer {
    position: relative;
    padding: 2.5rem var(--page-inset) 2.5rem;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    font-size: 0.85em;
    color: var(--foreground-75);

    &.sticky {
      position: fixed;
      bottom: 0;
      width: 100%;
      border-top: 1px solid var(--foreground-25);
    }
  }

  .copywrite {
    font-size: 0.9em;
  }

  .split {
    flex-flow: row-reverse wrap;
  }

  section {
    flex: 1;
    display: flex;
    flex-flow: row wrap;
    // align-items: space-between;
    align-items:flex-end;
    justify-content: space-between;
    // background-color: cyan;
    row-gap: 1.5em;
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
    flex: 0;
    display: flex;
    flex-flow: row;
    align-items: center;
    gap: 1em;
    font-size: 0.8rem;

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
</style>
