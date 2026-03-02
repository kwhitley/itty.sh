<script>
  import weighted from 'weighted'
  import Logo from './Logo.svelte'
  import VersionBadge from './VersionBadge.svelte'

  export let showVersion = false

  const taglines = {
    'from the creator of itty.dev': 100,
    'single-step file-sharing': 60,
    'Dropbox, without the login': 20,
    'If bit.ly and Dropbox had a baby...': 20,
    'a place to store only marginally useful stuff': 10,
    'as seen on Shark Tank (2029)': 1,
    'just another excuse to use magenta': 1,
  }

  const tagline = weighted.select(taglines) || ''
</script>

<!-- MARKUP -->
<a class="brand" href="/">
  <Logo />
  <span><VersionBadge /></span>
  <div class="tagline">{tagline}</div>
</a>

<!-- STYLES -->
<style lang="scss">
  .brand {
    align-self: center;
    padding: 0.15rem 0 0.6rem;
    font-size: 2.5rem;
    white-space: nowrap;
  }

  .tagline {
    font-size: 0.33em;
    letter-spacing: -0.02em;
    color: var(--foreground-75);
    margin-top: -0.25em;
    font-weight: 400;
    z-index: 2;
    font-family: sans-serif;
  }

  a {
    font-size: var(--brand-size);
    letter-spacing: -0.05em;
    transition: color 0.2s ease;
    display: inline-block;
    transform-origin: 0% 50%;

    &:hover {
      text-decoration: none;
      opacity: 0.8;
    }
  }
</style>
