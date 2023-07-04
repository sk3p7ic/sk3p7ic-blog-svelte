<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	console.log(data);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#each data.allPosts as post}
	<h1>{post.frontmatter.title}</h1>
	<p>{post.frontmatter.description}</p>
{/each}
