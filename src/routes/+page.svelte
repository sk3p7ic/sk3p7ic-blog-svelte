<script lang="ts">
	import type { PageData } from './$types';
	import Katex from 'svelte-katex';
	export let data: PageData;
	console.log(data);

	let m = 'x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<p>
	<span class="math math-display">
		<span class="katex-display">
			<Katex displayMode>{m}</Katex>
		</span>
	</span>
</p>

{#each data.allPosts as post}
	<h1>{post.frontmatter.title}</h1>
	<p>{post.frontmatter.description}</p>
{/each}
