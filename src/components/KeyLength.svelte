<script>
  import { keyLength, ttl } from '~/stores'
  import { generateHash } from 'supergeneric/generateHash'
  import RangeSlider from 'svelte-range-slider-pips'

  const messaging = [
    'just asking to be discovered', //<em>requires subscription</em>',
    'just asking to be discovered', //<em>requires subscription</em>',
    // 'extremely unsafe', //<em>requires subscription</em>',
    'very unsafe',// <em>requires subscription</em>',
    'very unsafe',// <em>requires subscription</em>',
    // 'unsafe',// <em>requires subscription</em>',
    'kinda safe',
    'safe "enough"',
    'very safe',
    'very very safe',
    'very very very safe',
    'very very very very safe',
    'overkill',
    'extreme overkill',
    'I have trust issues',
    'a needle in the universe',
  ]


  let localValue = $keyLength
  let values = [localValue]

  $: if (localValue > 15) {
    localValue = 15
  }

  $: $keyLength = localValue === 15 ? 256 : localValue
  $: message = messaging[localValue-2]
  $: permutations = $keyLength < 15 ? `~${Math.pow(55, $keyLength).toLocaleString()}` : 'MANY'
  $: example = `ity.sh/${generateHash($keyLength)}`

  const changeHandler = e => localValue = e.detail.value

  // colors
  let hue = [244]
  $: lightColor = `hsl(${Math.round(hue[0]) - 10}, 65%, 70%)`
  $: color = `hsl(${Math.round(hue[0])}, 63%, 54%)`
</script>

<!-- MARKUP -->
<section class="range">
  How safe do you want it? <span>{@html message}</span>
  <dl>
    <dt>Example:</dt>
    <dd class="accent">{example}</dd>
  </dl>

  <RangeSlider
    bind:values
    on:change={changeHandler}
    min={2}
    max={15}
    pips
    />
</section>

<style lang="scss">
  section {
    padding-bottom: 2em;
    display: flex;
    flex-flow: row wrap;
    align-items: baseline;
    column-gap: 0.4em;
    row-gap: 0.5em;
    display: flex;
    font-weight: 600;

    input {
      flex: 1 100%;
    }
  }

  dl {
    flex-flow: row;
  }

  dt {
    flex: 0;
  }

  dd {
    word-break: break-all;
    line-height: 1em;
  }

  :global(.range em) {
    opacity: 0.7;
    font-style: normal;
    font-size: 0.5em;

    &:before {
      content: '*';
    }
  }

  span {
    font-size: 1.8em;
    font-weight: 200;
    line-height: 1em;
    color: var(--blue);
  }

  :global(.range em) {
    white-space: nowrap;
    line-height: 0;
  }

  @media screen and (max-width: 35em) {
    span {
      flex: 1 100%;
    }
  }

  :global(.rangeSlider) {
    flex: 1 100%;
    margin: 0.5em;

    --range-handle-focus: var(--blue);
  }

  :global(.rangeSlider .rangeHandle) {
    height: 25px;
    width: 25px;
  }

  :global(.rangeNub) {
    border: 3px solid var(--background-color);
  }
</style>
