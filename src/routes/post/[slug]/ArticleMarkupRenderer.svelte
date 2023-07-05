<script lang="ts">
	import { onMount } from 'svelte';
	import ArticleKatexRenderer from './ArticleKatexRenderer.svelte';
	import './article.postcss';

	export let markup: string;
	let html: HTMLDivElement | undefined = undefined;
	onMount(() => {
		html = document.createElement('div');
		html.innerHTML = markup;
		let mathElems: string[] = [];
		html.querySelectorAll('.math').forEach((el) => {
			const mathExpr = el.innerHTML;
			new ArticleKatexRenderer({
				target: el,
				props: {
					displayMode: el.classList.contains('math-display'),
					mathExpr
				}
			});
			mathElems.push(el.innerHTML);
		});
		console.log(mathElems);
		if (mathElems.length > 0) {
			document.querySelectorAll('.math').forEach((el, i) => {
				el.innerHTML = mathElems[i];
				el.firstChild!.textContent = '';
			});
		}
	});
</script>

{@html html?.innerHTML ?? 'Loading...'}
