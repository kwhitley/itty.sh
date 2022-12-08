<!-- MARKUP -->
<span>it<strike>t</strike>y<small>.sh</small></span>

<!-- STYLES -->
<style lang="scss">
  span {
    color: var(--accent-color);
    letter-spacing: -0.03em;
    display: flex;
  }

  small {
    font-size: 0.7em;
    font-size: 1em;
    font-style: normal;
    letter-spacing: -0.05em;
    display: inline-block;
    margin-left: -0.1em;
    color: var(--foreground-75);
  }

  strike {
    display: inline-block;
    overflow: hidden;
    transition: max-width 0.2s ease;
    max-width: 1em;
  }
</style>
