<script>
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-vintage.css';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';

	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';

	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';

	storeHighlightJs.set(hljs);
</script>

<AppShell regionPage="relative" slotPageHeader="sticky top-0 z-10">
	<svelte:fragment slot="pageHeader">
		<AppBar><h4 class="h4">Sk3p7ic's Blog</h4></AppBar>
	</svelte:fragment>

	<slot />

	<svelte:fragment slot="footer">
		<footer class="py-4 text-center">
			&copy; Joshua Ibrom, {new Date().getFullYear()}
		</footer>
	</svelte:fragment>
</AppShell>
