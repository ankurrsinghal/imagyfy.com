<script lang="ts">
	import Canvas from "./Canvas.svelte";
	import Controller from "./ControlsPane.svelte";
	import DataContext from "./DataContext.svelte";

  

</script>

<div class="w-full h-full flex app">
  <DataContext>
    <Canvas />
    <Controller />
  </DataContext>
</div>

<style>
.app {
  background-color: hsl(220, 24%, 86%);
  min-width: 100vw;
	min-height: 100vh;
}
</style>