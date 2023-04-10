<script>
  import { onMount } from 'svelte'
  import { fade, fly } from 'svelte/transition'
  import { PATH } from '~/api'
  import EntryList from '~/components/EntryList.svelte'
  import Progress from '~/components/Progress.svelte'
  import { postResults } from '~/stores'
  import Preview from './Preview.svelte'

  let expandedIndex = undefined
  let anchor

  $: entries = $postResults?.entries || []
  $: singleEntry = entries.length === 1 ? entries[0] : false
  $: completed = entries.filter(e => !e.submitting && !e.error)
  $: expired = $postResults.expired
  $: submitting = $postResults.submitting

  $: {
    if (expired || submitting) {
      expandedIndex = undefined
    }

    if (completed) {
      setTimeout(() => anchor.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }

  const toggleExpanded = (index) => () => { expandedIndex = (expandedIndex === index) ? undefined : index }
</script>

<!-- MARKUP -->
<div bind:this={anchor}></div>
{#if singleEntry}
  {#key singleEntry.key}
    <Preview
      key={singleEntry.key}
      submitting={submitting}
      />
  {/key}
{:else if !expired}
  <main out:fade={{ duration: 300, delay: 400 }}>
    {#if $postResults.submitting}
      <div class="progress" out:fly={{ x: 400, duration: 300, delay: 600 }}>
        <Progress min={0} max={entries.length} value={completed.length} />
      </div>
    {/if}

    <EntryList items={entries} expired={expired} submitting={submitting} />
  </main>
{/if}


<!-- <pre>
  { JSON.stringify($postResults, null, 2) }
</pre> -->

<!-- STYLES -->
<style lang="scss">

</style>
