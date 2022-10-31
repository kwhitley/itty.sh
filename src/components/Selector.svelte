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
  section {
    font-size: 1.18rem;
    display: flex;
    flex-flow: row wrap;
    gap: 0.5em;
    align-items: baseline;

    & > * {
      white-space: nowrap;
    }
  }

  .value {
    font-size: 1.8em;
    font-weight: 200;
    color: var(--blue);
  }

  small {
    margin: 1em 0;
    font-weight: 100;
  }

  input[type=range] {
    --size: 5em;
    --thumb-width: 1em;
    --radius: calc(var(--border-radius) * 0.3);
    border-radius: var(--radius);
    outline: 0;
		border: 0;
		// border-radius: 500px; // modify
		// width: 400px;
		max-width: 100%;
		// margin: 24px 0 16px;
		transition: box-shadow 0.2s ease-in-out;
    position: absolute;
    opacity: 0.8;
    z-index: 0;

    @media screen and (-webkit-min-device-pixel-ratio:0) {
			& {
				overflow: hidden;
				height: var(--size);
				-webkit-appearance: none;
				background-color: #ddd;
			}
			&::-webkit-slider-runnable-track {
				height: var(--size);
				-webkit-appearance: none;
				color: #444;
				// margin-top: -1px;
				transition: box-shadow 0.2s ease-in-out;
			}
			&::-webkit-slider-thumb {
				width: var(--thumb-width);
				-webkit-appearance: none;
				height: var(--size);
				cursor: ew-resize;
				background: #fff;
				box-shadow: -340px 0 0 330px #1597ff, inset 0 0 0 var(--size) #1597ff;
				border-radius: var(--radius);
				transition: box-shadow 0.1s ease-in-out;
				position: relative;
				// top: 1px;
			}
			&:active::-webkit-slider-thumb {
				// background: #fff;
				// box-shadow: -340px 0 0 320px #1597ff, inset 0 0 0 3px #1597ff;
			}
		}
    // Firefox
		&::-moz-range-progress {
			background-color: #43e5f7;
		}
		&::-moz-range-track {
			background-color: #9a905d;
		}
		// IE
		&::-ms-fill-lower {
			background-color: #43e5f7;
		}
		&::-ms-fill-upper {
			background-color: #9a905d;
		}
  }
</style>
