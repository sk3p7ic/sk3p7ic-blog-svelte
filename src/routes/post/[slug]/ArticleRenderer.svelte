<script lang="ts">
	import type { AST } from '$lib/types';
	import { prependFilenameToCode } from '$lib/util';
	import { CodeBlock } from '@skeletonlabs/skeleton';
	import { unified } from 'unified';
	import remarkMath from 'remark-math';
	import rehypeKatex from 'rehype-katex';
	import rehypeStringify from 'rehype-stringify/lib';
	import remarkHtml from 'remark-html';
	import remarkRehype from 'remark-rehype/lib';
	import rehypeRemark from 'rehype-remark/lib';
	import ArticleMarkupRenderer from './ArticleMarkupRenderer.svelte';

	export let ast: AST;
	const { children } = ast;
	// TODO: Split at the code blocks and process them separately
	const codeBlockIndices = children.reduce(
		(acc, child, index) => {
			if (child.type === 'code') {
				acc.push(index);
			}
			return acc;
		},
		[0] as number[]
	);
	let segments = [];
	for (let i = 0; i < codeBlockIndices.length; i++) {
		const start = codeBlockIndices[i];
		const end = codeBlockIndices[i + 1] || start + 1;
		segments.push(children.slice(start, end));
		if (!codeBlockIndices[i + 1]) {
			segments.push(children.slice(end));
		}
	}
	const newASTs = segments.map((segment) => {
		return { hasCode: segment[0].type === 'code', ast: { ...ast, children: segment as any } };
	});
	const markups = newASTs.map((newAST) => {
		if (newAST.hasCode) {
			return newAST.ast.children[0];
		} else {
			return unified()
				.use(remarkMath)
				.use(remarkRehype)
				.use(rehypeKatex)
				.use(rehypeStringify)
				.use(rehypeRemark)
				.use(remarkHtml, { sanitize: false })
				.stringify(newAST.ast);
		}
	});
</script>

{#each markups as markup}
	{#if typeof markup === 'string'}
		<ArticleMarkupRenderer {markup} />
	{:else}
		<CodeBlock language={markup.lang} code={prependFilenameToCode(markup.value, markup.meta)} />
	{/if}
{/each}
