import type { PostType } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const { slug } = params;
	const post: PostType = await fetch(`/api/load-post/${slug}`).then((res) => res.json());
	console.log(post);
	return {
		post
	};
}) satisfies PageLoad;
