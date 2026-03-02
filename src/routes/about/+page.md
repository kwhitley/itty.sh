<script>
  import earth from '$lib/assets/itty-usb-earth.jpg'
  import { pageTitle } from '~/utils/pageTitle'

  // let { quote } = data
</script>

<!-- HEAD -->
<svelte:head>
  <title>{pageTitle('a flashdrive for Planet Earth')}</title>
  <meta name="description" content="Itty is a next-gen platform for temporary storage & file sharing, focusing on utter and complete simplicity of use." />
</svelte:head>

<main>

# Meet <span class="accent">it<strike>t</strike>y</span>.sh

<figure id="earth" class="float-right">
  <img src={earth} class="right" alt="Earth, connected to a usb-drive, against a field of pink." />
</figure>

Itty.sh has only one purpose:

***To make temporary file sharing really freaking easy.***

### How does it achieve this?
1. We don't have logins, API keys, or anything like that.  More Steps = Bad.
1. You get a direct link to your *actual* content... not a page with popups/ads AND your content.
1. Cleanup is automatic.  All trace of the files are erased worldwide once the timer goes off.

Spoiler: You can do some pretty cool things with that...

### Sound good? <a href="/">Try it out</a> today!
</main>

<!-- STYLES -->
<style lang="scss">
  #earth {
    max-width: clamp(25rem, 70vw, 40em);
    margin-right: -5em;
    margin-left: 0;
    margin-bottom: 0;
    margin-top: -1rem;

    img {
      z-index: -1;
    }
  }


  @media (prefers-color-scheme: dark) {
    main {
      margin-top: 0;
    }

    #earth {
      display: none;
    }
  }
</style>
