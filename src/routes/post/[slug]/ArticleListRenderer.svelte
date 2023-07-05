<script lang="ts">
	import Katex from 'svelte-katex';

	export let ast: any;
</script>

{#each ast.children as child}
	{#if child.type === 'paragraph'}
		{child.children[0].value}
	{:else if child.type === 'inlineMath'}
		<span class="math inline-math">
			<Katex>{child.value}</Katex>
		</span>
	{:else if child.type === 'code'}
		<code class="code">{child.children[0].value}</code>
	{/if}
{/each}
