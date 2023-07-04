<script>
  // Your selected Skeleton theme:
  import '@skeletonlabs/skeleton/themes/theme-vintage.css';

  // This contains the bulk of Skeletons required styles:
  import '@skeletonlabs/skeleton/styles/skeleton.css';

  // Finally, your application's global stylesheet (sometimes labeled 'app.css')
  import '../app.postcss';

  import {AppShell, AppBar} from '@skeletonlabs/skeleton'
</script>

<AppShell regionPage="relative" slotPageHeader="sticky top-0 z-10">
  <svelte:fragment slot="pageHeader">
    <AppBar>Sk3p7ic's Blog</AppBar>
  </svelte:fragment>

  <slot />

  <svelte:fragment slot="footer">
    <footer class="py-4 text-center">
      &copy; Joshua Ibrom, {new Date().getFullYear()}
    </footer>
  </svelte:fragment>
</AppShell>
