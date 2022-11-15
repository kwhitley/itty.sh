<script>
  export let min = 0
  export let max = 100
  export let value = 100
</script>

<!-- MARKUP -->
<div class="progress">
  <section style={`width: ${100 / (max - min) * value}%;`}>
    <em class="progress-bar-message" class:first={value===0}>
      <slot />
    </em>
  </section>
</div>

<!-- STYLES -->
<style lang="scss">
  :root {
    --progress-font-size: 0.8rem;
    --progress-border-radius: 0.4rem;
    --progress-scale: 0.6;
  }

  .progress {
    background: #eee;
    border-radius: var(--progress-border-radius);
    overflow: hidden;
    font-size: var(--progress-font-size);
    height: calc(1.3rem * var(--progress-scale));
    position: relative;
  }

  section {
    background-color: red;
    border-radius: 2px;
    background-image:
      -webkit-linear-gradient(-45deg,
                              transparent 33%, rgba(0, 0, 0, .05) 33%,
                              rgba(0,0, 0, .05) 66%, transparent 66%),
      -webkit-linear-gradient(left, rgb(255, 255, 255), rgb(255, 0, 234)); // -webkit-linear-gradient(left, #09c, rgb(53, 255, 97));
    background-size: calc(35px * var(--progress-scale)) calc(20px * var(--progress-scale)), 100% 100%, 100% 100%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    transition: all 0.3s ease;
  }

  em {
    font-family: sans-serif;
    font-style: normal;
    position: absolute;
    white-space: nowrap;
    right: 0;
    z-index: 10;
    display: inline-block;
    font-size: var(--progress-font-size);
    display: flex;
    gap: 0.22em;
    top: 0;
    bottom: 0;
    align-items: center;
    right: calc(0.5rem * var(--progress-scale));
    color: #fff;
    text-shadow: 0 0 0.4em rgba(0,0,0,0.3);
    font-weight: 400;
    letter-spacing: -0.02em;

    &.first {
      right: inherit;
      left: calc(0.5rem * var(--progress-scale));
      color: rgba(0,0,0,0.6);
      text-shadow: none;
    }
  }
</style>
