<script>
  import { getSeconds } from 'itty-time'
  import { ttl, textTTL } from '~/stores'
  import { generateHash } from 'supergeneric/generateHash'

  let message
  let localTTL = undefined

  $: {
    message = ''

    if ($ttl < 7) {
      message = '- early access only'
    }

    if ($ttl <= 3) {
      message += ' & high discovery risk'
    }
  }

  const ttlLookup = [
    '10 seconds',
    '1 minute',
    '1 hour',
    '1 day',
    '1 week',
    '1 month',
    '1 year',
    'until I unsubscribe',
  ]

  const additionalMessaging = {
    '10 seconds': '*demo only',
    '1 minute': '*paid tier only',
    '1 month': '*paid tier only',
    '1 year': '*paid tier only',
    '30 years': '*paid tier only',
  }

  $: {
    if (!localTTL) {
      localTTL = $ttl
    } else {
      $ttl = localTTL
    }
  }

  $: {
    let expires = ttlLookup[$ttl-1]
    if (expires === 'until I unsubscribe') {
      expires = '30 years'
    }

    $textTTL = expires
  }

  $: additionalMessage = additionalMessaging[$textTTL] || ''
  console.log('setting additionalMessage', additionalMessage, 'from', $textTTL, additionalMessaging[$textTTL])
</script>

<!-- MARKUP -->
<label class="range2">
  How long should it be available? <span>{ttlLookup[$ttl-1]} <em>{@html additionalMessage}</em></span>
  <input type="range" min="1" max="8" bind:value={localTTL} />
</label>

<style lang="scss">
  label {
    font-size: 1.3em;
    padding-bottom: 1em;
    display: flex;
    flex-flow: row wrap;
    align-items: baseline;

    input {
      flex: 1 100%;
    }
  }

  :global(.range2 em) {
    opacity: 0.7;
    font-style: normal;
    font-size: 0.5em;
  }

  span {
    font-size: 1.8em;
    font-weight: 200;
    margin-left: 0.2em;
    color: var(--blue);
  }

  small {
    margin: 0.4em 0;
    font-weight: 100;
  }
</style>
