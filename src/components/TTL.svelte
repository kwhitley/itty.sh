<script>
  import { getSeconds } from 'itty-time'
  import { ttl, textTTL } from '~/stores'
  import { generateHash } from 'supergeneric/generateHash'
  import RangeSlider from 'svelte-range-slider-pips'

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

  let values = [$ttl]

  const ttlLookup = [
    '10 seconds',
    '1 minute',
    '2 minutes',
    '5 minutes',
    '10 minutes',
    '30 minutes',
    '1 hour',
    '1 day',
    '1 week',
    '1 month',
    '1 year',
    'until I unsubscribe',
  ]

  const additionalMessaging = {
    '10 seconds': '*demo only',
    '1 week': '*requires subscription',
    '1 month': '*requires subscription',
    '1 year': '*requires subscription',
    // '30 years': '*requires subscription',
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

  const changeHandler = e => localTTL = e.detail.value
</script>

<!-- MARKUP -->
<label class="range2">
  How long should it be available? <span>{ttlLookup[$ttl-1]} <em>{@html additionalMessage}</em></span>

  <RangeSlider
    bind:values
    on:change={changeHandler}
    min={1}
    max={ttlLookup.length}
    />
</label>

<style lang="scss">
  label {
    padding-bottom: 1em;
    display: flex;
    flex-flow: row wrap;
    align-items: baseline;
    column-gap: 0.4em;

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
    line-height: 1em;
    color: var(--blue);
  }

  em {
    white-space: nowrap;
    line-height: 0;
  }

  @media screen and (max-width: 35em) {
    span {
    flex: 1 100%;
    }
  }
</style>
