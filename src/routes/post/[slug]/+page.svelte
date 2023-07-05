<script lang="ts">
	import type { PageData } from './$types';
	import type { PostType } from '$lib/types';
	import ArticleRenderer from './ArticleRenderer.svelte';
	import { TableOfContents } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	export let data: PageData;
	let post: PostType = data.post;

	onMount(() => {
		const tocElem = document.getElementById('toc')!;
		new TableOfContents({
			target: tocElem,
			props: {
				target: '#the-article',
				label: 'Table of Contents',
				width: 'w-full'
			}
		});
	});
</script>

<svelte:head>
	<title>{post.frontmatter.title}</title>
</svelte:head>

<div class="mx-12 my-12">
	<div class="card">
		<header class="card-header">
			<h1 class="h1">{post.frontmatter.title}</h1>
			<p class="text-gray-500 text-sm">{new Date(post.dateCreated)}</p>
		</header>
		<section class="p-4">
			<div id="toc" class="py-2 border-y" />
			<div id="the-article"><ArticleRenderer ast={post.ast} /></div>
		</section>
		<footer class="card-footer">Author Info</footer>
	</div>
</div>
