<!-- MARKUP -->
<section>
  <h1>404</h1>
  <h2>
    That link is not valid, or has already expired.
    <cite>
      the Sign Painter
    </cite>
  </h2>
</section>

<!-- STYLES -->
<style lang="scss">
  section {
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }

  h1 {
    font-size: clamp(8rem, 40vw, 25rem);
    position: absolute;
    margin-bottom: 0.1em;
    opacity: 0.1;
    z-index: -1;
  }

  h2 {
    font-size: clamp(1.2rem, 6vw, 2.5rem);
    padding: 0 1.5em;
    text-align: center;
  }

  cite {
    display: block;
    text-align: right;
    font-size: 0.6em;
    margin-top: 0.6em;
    font-style: normal;
    font-weight: 200;
    font-size: clamp(0.85rem, 0.6em, 0.6em);

    &:before {
      content: '~ ';
    }
  }
</style>
