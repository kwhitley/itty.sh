<script>
  import Page from '~/layout/Page.svelte'
</script>

<!-- MARKUP -->
<Page splash>
  <h1>it<strike>t</strike>y.sh<small>/???</small></h1>

  <p>coming soon :)</p>
</Page>

<!--
<Page full>
  <h2>Another header</h2>
</Page> -->

<!-- STLYES -->
<style lang="scss">
  h1 {
    cursor: default;
    user-select: none;
    white-space: nowrap;
  }

  h1:hover {
    strike {
      max-width: 0;
      opacity: 0;
    }
  }

  strike {
    overflow: hidden;
    transition: opacity, max-width 0.15s ease;
    max-width: 0.3em;
    letter-spacing: 0;
    margin-right: -0.05em;
    // background-color: red;
    display: inline-flex;
    line-height: 0.72em;
  }

  small {
    opacity: 0.4;
    margin-left: 0.1em;
    font-size: 0.7em;
    letter-spacing: 0;
  }
</style>
