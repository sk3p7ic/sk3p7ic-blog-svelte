<script lang="ts">
	import type { PageData } from './$types';
	import { formatDateString } from '$lib/util';
	export let data: PageData;

	// Filter out drafts in production
	data.allPosts.filter(
		(post) => process.env.NODE_ENV !== 'production' || !post.frontmatter.published
	);
</script>

<div class="p-4 flex flex-col gap-8">
	<div class="card p-8 flex items-center justify-center">
		<div class="flex flex-col items-center jutstify-center w-fit">
			<h1 class="h1">Sk3p7ic's Blog</h1>
			<p class="text-lg">Covering the musings of a computer science student.</p>
			<div class="grid grid-cols-3 divide-x w-full text-center">
				<a href="https://joshuaibrom.com" class="anchor">Personal Site</a>
				<a href="https://github.com/sk3p7ic" class="anchor">GitHub</a>
				<a href="https://sk3p7ic.tech" class="anchor">Web Dev Site</a>
			</div>
		</div>
	</div>

	<div class="card p-4">
		<header class="card-header">
			<h2 class="h2">Latest Posts</h2>
		</header>
		<section class="p-4">
			<ul class="list divide-y flex flex-col gap-2 px-4">
				{#each data.allPosts as post}
					<li class="pt-2 first:pt-0">
						<div class="flex-auto flex flex-col gap-1 p-2">
							<a href={`/post/${post.slug}`} class="h3 anchor p-0">{post.frontmatter.title}</a>
							<p class="text-sm p-0">{formatDateString(post.dateCreated)}</p>
							<p class="p-0">{post.frontmatter.description}</p>
						</div>
					</li>
				{/each}
			</ul>
		</section>
	</div>
</div>
