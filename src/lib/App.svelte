<script lang="ts">
	import Canvas from "./Canvas.svelte";
	import Controller from "./ControlsPane.svelte";
	import DataContext from "./DataContext.svelte";

  let file: File | undefined;

  function hanldeDragEnter(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    console.log("hanldeDragEnter");
  }

  function handleDragOver(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    console.log("handleDragOver");
  }

  function handleDragEnd(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    console.log("handleDragEnd");
  }
  
  function handleDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    console.log("handleDrop");
    const files = e.dataTransfer?.files;
    file = files && files[0];
  }
</script>

<div class="w-full h-full flex app" on:drop={handleDrop} on:dragenter={hanldeDragEnter} on:dragover={handleDragOver} on:dragend={handleDragEnd}>
  <div class="fixed top-4 left-4 overflow-hidden z-10 shadow-xl">
    <a href="/" class="w-24 h-10 bg-black rounded-md text-white p-1 flex items-center justify-center">ImagyFy</a>
  </div>
  <DataContext>
    <Canvas droppedFile={file} />
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