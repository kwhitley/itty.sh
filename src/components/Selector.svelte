<script>
  export let prompt = 'How long should it be available?'
  export let options
  export let value
  let index = 0

  // sync index to value and back
  $: {
    if (index === undefined) {
      index = value
    } else {
      // value = index
    }
  }

  $: selected = options[index]
  $: label = selected.label || selected.value
  $: paidOnly = selected.paid
  $: extra = selected.extra
</script>

<!-- MARKUP -->
<label>
  <section>
    <span>{prompt}</span>
    <span class="value">{label}</span>
    {#if paidOnly}
      <small class="paid">*paid only</small>
    {/if}
    {#if extra}
      <small>{extra}</small>
    {/if}
  </section>

  <input
    type="range"
    min={0}
    max={options.length-1}
    bind:value={index}
    />
</label>






<!-- STYLES -->
<style lang="scss">
  label {
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
</style>
