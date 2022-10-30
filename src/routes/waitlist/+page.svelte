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
  Thanks for your interest in participating in the private alpha launch of <strong>itty.sh</strong>!  Ultimately
  during this test period, we'll be allowing participants to play and provide feedback, shaping the early direction
  and feature-set for both the anonymous public as well as paid users.
</p>

<p>
  In the next few weeks, we'll be contacting users from this list for early access to the platform.
</p>

<h3>In the meantime:</h3>

<ul>
  <li>Join us on the new <a href="https://discord.com/channels/832353585802903572/832353586234392609">Discord server</a>.</li>
  <li><a href="https://twitter.com/kevinrwhitley">Follow me on Twitter</a> - this is where most announcements will occur!</li>
</ul>
<!--
<p>
  <strong>NOTE: This is designed from the ground up to be an open and anonymous platform.  By that very nature, when the private beta is underway,
  in order to test certain features, the site/platform will technically be available and open to everyone in the world.  I merely ask that
  during this period, you refrain from sharing the private platform link.</strong>
</p> -->

{#if !success}
  <div
    class="container"
    class:shaking={error}
    out:fly={{ x: -50, duration: 100 }}
    >
    <SearchInput
      placeholder="yourname@wherever.com"
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
    <h2>Thanks for signing up!</h2>
    <p>
      Expect an email soon(ish) with instructions on accessing the alpha.  Until then, hang tight!
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
