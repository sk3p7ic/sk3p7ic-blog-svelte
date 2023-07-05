<script lang="ts">
	import Katex from 'svelte-katex';

	export let displayMode: boolean;
	export let mathExpr: string;
</script>

<Katex {displayMode}>{mathExpr}</Katex>
