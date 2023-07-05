<script lang="ts">
	import type { AST } from '$lib/types';
	import { prependFilenameToCode } from '$lib/util';
	import { CodeBlock } from '@skeletonlabs/skeleton';
	import Katex from 'svelte-katex';
	import ArticleListRenderer from './ArticleListRenderer.svelte';
	import { unified } from 'unified';
	import remarkMath from 'remark-math';
	import rehypeKatex from 'rehype-katex';
	import rehypeStringify from 'rehype-stringify/lib';
	import remarkHtml from 'remark-html';
	import remarkRehype from 'remark-rehype/lib';
	import rehypeRemark from 'rehype-remark/lib';

	export let ast: AST;
	const { children } = ast;
	// TODO: Split at the code blocks and process them separately
	let modifiedChildren = children.filter((child) => child.type !== 'code');
	ast.children = modifiedChildren;
	const markup = unified()
		.use(remarkMath)
		.use(remarkRehype)
		.use(rehypeKatex)
		.use(rehypeStringify)
		.use(rehypeRemark)
		.use(remarkHtml, { sanitize: false })
		.stringify(ast);
	console.log(markup);
</script>

{#each children as child}
	{#if child.type === 'heading'}
		<a class={`h${child.depth} group`} href={`#${child.children[0].value}`}>
			<span id={`${child.children[0].value}`}>{child.children[0].value}</span>
			<span class="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">#</span>
		</a>
	{/if}

	{#if child.type === 'paragraph'}
		<p>
			{#each child.children as pchild}
				{#if pchild.type === 'text'}
					{pchild.value}
				{:else if pchild.type === 'inlineMath'}
					<span class="math inline-math">
						<Katex>{pchild.value}</Katex>
					</span>
				{/if}
			{/each}
		</p>
	{/if}

	{#if child.type === 'code'}
		<CodeBlock
			language={child.lang || ''}
			code={prependFilenameToCode(child.value, child.meta || '')}
		/>
	{/if}

	{#if child.type === 'list'}
		<ul>
			{#each child.children as listchild}
				<ArticleListRenderer ast={listchild} />
			{/each}
		</ul>
	{/if}
{/each}
