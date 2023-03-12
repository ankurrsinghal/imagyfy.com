<script lang="ts">
	import { fade } from "svelte/transition";
	import Card from "./Card.svelte";
	import Corner from "./Corner.svelte";
	import { getGradientStore } from "./GradientsStore";
  let ref: HTMLDivElement | undefined;
  let __width = 800;
  let __height = 600;
  let scaleHorizontal = false;
  let scaleVertical = false;

  const MAX_WIDTH = 1080;
  const MIN_WIDTH = 425;

  const MAX_HEIGHT = 1080;
  const MIN_HEIGHT = 425;

  $: width = `${__width}px`;
  $: height = `${__height}px`;

  type Placement = "top" | "right" | "bottom" | "left";

  function handleResize(placement: Placement, { dx, dy }: { dx: number, dy: number }) {
    if (!ref) return;
    let width = __width;
    let height = __height;

    if (placement === "top") height -= 2*dy;
    if (placement === "right") width += 2*dx;
    if (placement === "bottom") height += 2*dy;
    if (placement === "left") width -= 2*dx;

    if (width !== __width && width >= MIN_WIDTH && width <= MAX_WIDTH) __width = width;
    if (height !== __height && height >= MIN_HEIGHT && height <= MAX_HEIGHT) __height = height;
  }

  function handleResizeStart(placement: Placement) {
    if (placement === "top" || placement === "bottom") scaleVertical = true;
    if (placement === "left" || placement === "right") scaleHorizontal = true;
  }

  function handleResizeStop() {
    scaleHorizontal = false;
    scaleVertical = false;
  }

  const { activeGradient } = getGradientStore();
</script>

<div class="relative flex-1 flex items-center justify-center">
  {#if scaleVertical}
    <div transition:fade class="absolute top-0 bottom-0 left-0 w-4 transform -translate-x-[200%] flex items-center justify-center flex-col">
      <div class="w-full h-[1px] bg-slate-50"></div>
      <div class="w-[1px] bg-slate-50 flex-1"></div>
      <div class="text-xs py-8 text-slate-50 font-mono transform -rotate-90">{height}</div>
      <div class="w-[1px] bg-slate-50 flex-1"></div>
      <div class="w-full h-[1px] bg-slate-50"></div>
    </div>
  {/if}
  {#if scaleHorizontal}
    <div transition:fade class="absolute left-0 bottom-0 right-0 h-4 transform translate-y-[200%] flex items-center justify-center">
      <div class="h-full w-[1px] bg-slate-50"></div>
      <div class="h-[1px] bg-slate-50 flex-1"></div>
      <div class="text-xs px-8 text-slate-50 font-mono">{width}</div>
      <div class="h-[1px] bg-slate-50 flex-1"></div>
      <div class="h-full w-[1px] bg-slate-50"></div>
    </div>
  {/if}
  <div bind:this={ref} class="p-12 canvas relative flex items-center justify-center" style:width style:height>
    <div class="canvas-background absolute inset-0" style:background-image={$activeGradient.gradient}></div>
    <div class="absolute inset-0 z-10">
      <div class="absolute group w-4 h-4 cursor-ns-resize top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Corner onResize={(dx, dy) => handleResize("top", { dx, dy })} onResizeStart={() => handleResizeStart("top")} onResizeEnd={handleResizeStop} />
      </div>
      <div class="absolute group w-4 h-4 cursor-ew-resize top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
        <Corner onResize={(dx, dy) => handleResize("right", { dx, dy })} onResizeStart={() => handleResizeStart("right")}  onResizeEnd={handleResizeStop} />
      </div>
      <div class="absolute group w-4 h-4 cursor-ns-resize bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
        <Corner onResize={(dx, dy) => handleResize("bottom", { dx, dy })} onResizeStart={() => handleResizeStart("bottom")}  onResizeEnd={handleResizeStop} />
      </div>
      <div class="absolute group w-4 h-4 cursor-ew-resize top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2">
        <Corner onResize={(dx, dy) => handleResize("left", { dx, dy })} onResizeStart={() => handleResizeStart("left")} onResizeEnd={handleResizeStop}  />
      </div>
    </div>
    <Card width={width} height={height} />
  </div>
</div>

<style>
.canvas {
  width: 800px;
  height: 600px;
}

.canvas-background {
  border-radius: 10px;
  box-shadow: #ffffff26 0 0 0 1px, #32325d45 0 80px 120px -20px, #0000004d 0 30px 60px -10px;
}
</style>