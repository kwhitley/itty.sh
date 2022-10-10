<script>
  import { fade, slide } from 'svelte/transition'
  import { showIntro } from '~/stores'

  const toggle = () => {
    $showIntro = $showIntro === null ? false : !$showIntro
  }

  $: showingIntro = $showIntro !== false
</script>

<!-- MARKUP -->
<div class="split">
  {#if showingIntro}
    <h2 transition:fade={{ duration: 100 }}>So what is it<strike>t</strike>y.sh?</h2>
  {/if}
  <div class="right link" on:click={toggle}>
    {#if showingIntro}
      (hide this intro)
    {:else}
      (show intro again)
    {/if}
  </div>
</div>

{#if showingIntro}
  <section class="intro" transition:slide={{ duration: 150 }}>
    <p>
      This service is a fresh, new take on the traditional link-shortener.  While it always gives you back a link, it can:
    </p>

    <ul>
      <li>Redirect to another page (just type the full link) - this is just like <a href="https://bit.ly">bit.ly</a></li>
      <li>Store some content (whatever you type will come back out)</li>
      <li>Save a snippet/screenshot from the clipboard (just paste into the box)</li>
      <li>Store a file (just paste/drag a file onto it) ~24MB limit per file</li>
      <li>Do this an unlimited number of times, with an unlimited amount of traffic.</li>
      <li>Be programmed against via an <a href="/docs/api">open API</a> (developers, rejoice!)</li>
    </ul>

    <p>
      ...all without requiring you to be signed in, tracking/selling any personal data (at all/ever), and being 100% free for basic usage.
    </p>

    <p>
      Take that, <strong>bit.ly</strong>.
    </p>
  </section>
{/if}

<!-- STYLES -->
<style lang="scss">


  .intro {
    font-size: 1em;
    margin-bottom: 5em;

    h2 {
      margin-top: -0.5em;
    }

    li {
      font-size: 1.1em;
      margin-bottom: 0.2em;
    }
  }
</style>
