<script>
  import { fly } from 'svelte/transition'
  import SearchInput from '~/components/SearchInput.svelte'
  import { api } from '~/api'

  const validateEmail = str => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)
  let submitting
  let error = false

  const addEmail = (email) => {
    console.log('adding email', email)

    submitting = api
      .post('/waitlist', email)
      .then(() => {
        success = true
      })
      .catch((err) => {
        error = true

        setTimeout(() => {
          error = false
        }, 1000)
      })
  }

  let success = false
</script>

<!-- MARKUP -->
<h1>Join the Waitlist</h1>

<p>
  Thanks for your interest in participating in the private beta launch of <strong>itty.sh</strong>!
</p>

<p>
  In the next few weeks, we'll be contacting users from this list for early access to the platform, and given a private link to use it.
  This is for the pioneering group of folks that are fine with (experiencing/reporting) bugs, offering feedback, and just in general,
  playing with a thing.
</p>

<p>
  <strong>NOTE: This is designed from the ground up to be an open and anonymous platform.  By that very nature, when the private beta is underway,
  in order to test certain features, the site/platform will technically be available and open to everyone in the world.  I merely ask that
  during this period, you refrain from sharing the private platform link.</strong>
</p>

{#if !success}
  <div
    class="container"
    class:shaking={error}
    out:fly={{ x: -50, duration: 100 }}
    >
    <SearchInput
      placeholder="your email address"
      buttonText="Join Waitlist"
      validate={validateEmail}
      submitHandler={addEmail}
      clearOnSubmit
      />
  </div>
{:else}
  <div
    class="confirmation"
    in:fly={{ x: 100, duration: 200, delay: 110 }}
    >
    <h2>Thanks for signing up</h2>
    <p>
      Expect an email soon(ish) with instructions on accessing the alpha.
    </p>
  </div>

{/if}

<!-- STYLES -->
<style lang="scss">
  strong {
    font-weight: 400;
    letter-spacing: -0.02em;
  }
</style>
