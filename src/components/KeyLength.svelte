<script>
  import { keyLength } from '~/stores'
  import { generateHash } from 'supergeneric/generateHash'

  let message

  $: {
    message = ''

    if ($keyLength < 7) {
      message = '- early access only'
    }

    if ($keyLength <= 3) {
      message += ' & high discovery risk'
    }
  }

  $: permutations = $keyLength < 15 ? `~${Math.pow(55, $keyLength).toLocaleString()}` : 'MANY'
  $: example = `ity.sh/${generateHash($keyLength)}`
</script>

<!-- MARKUP -->
<label>
  Length of {$keyLength} letters/numbers, with {permutations} possibilities {message}
  <small>Example: {example}</small>
  <input type="range" min="2" max="15" bind:value={$keyLength} />
</label>

<style lang="scss">
  label {
    font-size: 1.4em;
    padding-bottom: 1em;
  }

  small {
    margin: 0.4em 0;
    font-weight: 100;
  }
</style>
