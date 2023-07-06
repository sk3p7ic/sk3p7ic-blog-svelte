<script lang="ts">
	import type { PageData } from './$types';
	import type { PostType } from '$lib/types';
	import ArticleRenderer from './ArticleRenderer.svelte';
	import { TableOfContents } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { formatDateString } from '$lib/util';

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

<div class="p-4 lg:mx-12 lg:my-12">
	<div class="card">
		<header class="card-header">
			<h1 class="h1">{post.frontmatter.title}</h1>
			<p class="text-gray-500 text-sm">
				Created {formatDateString(post.dateCreated)}
				{post.dateModified && ` | Updated ${formatDateString(post.dateModified)}`}
			</p>
			<div class="flex flex-row flex-wrap gap-2">
				{#if post.frontmatter.categories}
					{#each post.frontmatter.categories as category}
						<span class="badge variant-filled">{category}</span>
					{/each}
				{/if}
			</div>
		</header>
		<section class="p-4">
			<div id="toc" class="py-2 border-y" />
			<div id="the-article"><ArticleRenderer ast={post.ast} /></div>
		</section>
		<footer class="card-footer border-t pt-4">
			<h2 class="h2">Author Info</h2>
			<h3 class="h3">Joshua Ibrom</h3>
			<p>
				I'm a computer science student at Texas A&amp;M University - San Antonio. I'm also a web
				developer and general tech enthusiast. You may find more about me and the work that I do at
				<a href="https://joshuaibrom.com" class="anchor">joshuaibrom.com</a>.
			</p>
		</footer>
	</div>
</div>
