import type { PostListingType } from '$lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const allPosts: PostListingType[] = await fetch('/api/all-posts').then((res) => res.json());
	return {
		allPosts
	};
}) satisfies PageLoad;
