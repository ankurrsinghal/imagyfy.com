<script lang="ts">
	import Canvas from "./Canvas.svelte";
	import Controller from "./Controller.svelte";
	import DataContext from "./DataContext.svelte";

  

</script>

<div>
  <DataContext>
    <Canvas />
    <Controller />
  </DataContext>
</div>