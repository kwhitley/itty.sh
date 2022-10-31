<script lang="ts">
	import TextEditor from '@svuick/monaco'

  let content

  $: console.log('content changed', content)
</script>

<!-- MARKUP -->
<div class="outer">

	<TextEditor
    single
    path="/test.js"
    language="javascript"
    bind:content
    config={{ theme: 'vs-dark' }}
    />
</div>

<!-- STYLES -->
<style lang="scss">
  .outer {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
</style>
