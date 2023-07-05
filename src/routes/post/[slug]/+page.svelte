<script lang="ts">
	import type { PageData } from './$types';
	import type { PostType } from '$lib/types';
	import ArticleRenderer from './ArticleRenderer.svelte';

	export let data: PageData;
	let post: PostType = data.post;
</script>

<svelte:head>
	<title>{post.frontmatter.title}</title>
</svelte:head>

<main class="mx-12 my-12">
	<div class="card">
		<header class="card-header">
			<h1 class="h1">{post.frontmatter.title}</h1>
			<p class="text-gray-500 text-sm">{new Date(post.dateCreated)}</p>
		</header>
		<section class="p-4"><ArticleRenderer ast={post.ast} /></section>
		<footer class="card-footer">Author Info</footer>
	</div>
</main>
