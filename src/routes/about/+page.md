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

# Meet <span class="accent">it<strike>t</strike>y</span>.

<figure id="earth" class="float-right">
  <img src={earth} class="right" alt="Earth, connected to a usb-drive, against a field of pink." />
</figure>

Itty is a next-gen platform for temporary storage & file sharing, focusing on utter and complete _simplicity of use_.


Sometimes we need to temporarily hold onto a file.  
Sometimes we need to save a screenshot.  
Sometimes we want to send something to an entire group.  

Today, we:

- Each pick a random tool to send the file(s).  A flavor for everyone!  Chaos for the win.
- Usually have to be logged in to something, or pass credentials = extra steps
- Usually have to navigate pages, forms, complicated APIs, etc. to put the file(s) somewhere = extra steps
- Only then can we finally try to find a share link, which is all we wanted in the first place.
- Later on, usually years later, we remember to delete the thing.

> Itty solves this. 
<cite>probably someone at Itty</cite>

### So how does itty address these concerns?

1. For general use, we provide exactly one "form".

  It's really just a box.

  You can type stuff into the box.  Like a link.  Or even HTML/JSON.  
  You can paste stuff (including screenshots from your clipboard) into the box.  
  You can even drag files into the box!

  **Optionally:** You can set how secure you want it, and how long you want it to exist.

1. That's it!  You get a share link and a QR code in exchange.  

  This link takes you **straight** to the file content (or other page, in the case of a redirect).  No ad-filled pages with questionable download links.  Just the content that was placed in storage.  

  **For Developers:** This means you can use it like a lightweight Amazon S3, right from your browser.  Fetch statements in one line?  Yes please.

1. Finally, once the expiration passes (down to the second), every trace of this file, link, etc. will cease to exist 
  on our servers all around the world.  No need to remember any sort of cleanup, we handle that for you.

### Sound good? <a href="/create">Start creating</a> today!
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

      /* img {
        filter: invert(0.94) hue-rotate(180deg) saturate(200%) brightness(0.85);
      } */
    }
  }
</style>
