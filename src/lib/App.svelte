<script lang="ts">
	import Canvas from "./Canvas.svelte";
	import Controller from "./ControlsPane.svelte";
	import DataContext from "./DataContext.svelte";

  

</script>

<div class="w-full h-full flex app">
  <div class="fixed top-4 left-4 overflow-hidden z-10 shadow-xl">
    <a href="/" class="w-24 h-10 bg-black rounded-md text-white p-1 flex items-center justify-center">ImagyFy</a>
  </div>
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