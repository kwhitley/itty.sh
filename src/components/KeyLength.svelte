<script>
  import { keyLength, ttl } from '~/stores'
  import { generateHash } from 'supergeneric/generateHash'

  const messaging = [
    'very unsafe <em>paid tier only</em>',
    'very unsafe <em>paid tier only</em>',
    'pretty unsafe <em>paid tier only</em>',
    'moderately safe',
    'moderately safe',
    'very safe',
    'extremely safe',
    'overkill',
    'overkill',
    'overkill',
    'overkill',
    'overkill',
    'extreme-overkill',
    'extreme-overkill',
  ]

  $: message = messaging[$keyLength-2]

  $: permutations = $keyLength < 15 ? `~${Math.pow(55, $keyLength).toLocaleString()}` : 'MANY'
  $: example = `ity.sh/${generateHash($keyLength)}`
</script>

<!-- MARKUP -->
<label class="range">
  How safe do you want it? <span>{@html message}</span>
  <!-- Length of {$keyLength} letters/numbers, with {permutations} possibilities {message} -->
  <dl>
    <dt>Example:</dt>
    <dd class="accent">{example}</dd>
  </dl>
  <input type="range" min="2" max="15" bind:value={$keyLength} />
</label>

<style lang="scss">
  label {
    padding-bottom: 2em;
    display: flex;
    flex-flow: row wrap;
    align-items: baseline;

    input, small {
      flex: 1 100%;
    }
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
    margin-left: 0.2em;
    color: var(--blue);
  }

  small {
    margin: 0 0 0.4rem;
    font-weight: 100;
    font-size: 1em;
  }

  strong {
    font-weight: 200;
    color: var(--accent-color);
  }
</style>
