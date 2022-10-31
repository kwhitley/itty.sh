<script>
  export let data

  let { quote } = data
</script>

# Meet <span class="accent">it<strike>t</strike>y</span>,
## a flash drive for Planet Earth

> {quote.text}<cite>{quote.author}</cite>

Itty is a platform for temporary file sharing & storage, focusing on utter and complete _simplicity of use_.
Sometimes we need to temporarily hold onto a file.  Sometimes we need to save a screenshot.  Sometimes we want to send something to an entire group.  Even more challenging for developers, sometimes we just need to throw content up on the web as quickly as possible, without trying to find a happy temporary home for the mess.

Today, we:

- Each pick a random tool to send the file(s).  A flavor for everyone!  Chaos for the win.
- Usually have to be logged in to something, or pass credentials = extra steps
- Usually have to navigate pages, forms, complicated APIs, etc. to put the file(s) somewhere = extra steps
- Only then can we finally try to find a share link for our target audience.
- Later on, usually years later, we remember to delete the thing.

> Itty solves this. <cite>probably someone at Itty</cite>

### So how do we address these concerns?

1. For general consumer use, we provide exactly one "form".

  It's really just a box.

  You can type stuff into the box.  Like a link.  Or a secret message.  
  You can paste stuff (including screenshots from your clipboard) into the box.  
  You can even drag files into the box! (one file per link in early-access)
1. While you do this, you also set how secure (vs. short) you want the link, and how long you want it to exist.  Most people can ignore this.
1. That's it!  You get a share link and a QR code in exchange.

  _(HINT: every Itty link can instantly be turned into a QR code for mobile sharing by adding **".QR"** to the end)_
1. This link takes you **straight** to the file/content/redirect/whatever.  No ad-filled pages with questionable download links.  Just the content that was placed in storage.  For developers, this is awesome.  It means they can use it like a lightweight Amazon S3, right from their browser.
1. Finally, once the expiration passes (down to the second), every trace of this file, link, etc. will cease to exist on our servers.  No need to remember any sort of cleanup, we handle that for you.

<!-- STYLES -->
<style lang="scss">
  h2 {
    margin-top: -0.8em;
    margin-bottom: 1em;
  }
</style>
