<script lang="ts">
	import type { AST } from '$lib/types';
	import { prependFilenameToCode } from '$lib/util';
	import { CodeBlock } from '@skeletonlabs/skeleton';

	export let ast: AST;
	const { children } = ast;
</script>

{#each children as child}
	{#if child.type === 'heading'}
		<h1>{child.data}</h1>
	{/if}
	{#if child.type === 'paragraph'}
		<p>{child.data}</p>
	{/if}
	{#if child.type === 'code'}
		<CodeBlock
			language={child.lang || ''}
			code={prependFilenameToCode(child.value, child.meta || '')}
		/>
	{/if}
	{#if child.type === 'list'}
		<ul>
			<li>List goes here.</li>
		</ul>
	{/if}
{/each}
