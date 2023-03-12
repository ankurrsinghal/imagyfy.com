<script lang="ts">
	import { fade } from "svelte/transition";
	import Card from "./Card.svelte";
	import Corner from "./Corner.svelte";
  let ref: HTMLDivElement | undefined;
  let __width = 800;
  let __height = 600;
  let scaleHorizontal = false;
  let scaleVertical = false;

  const Gradients = [
    'linear-gradient(310deg, rgb(214, 233, 255), rgb(214, 229, 255), rgb(209, 214, 255), rgb(221, 209, 255), rgb(243, 209, 255), rgb(255, 204, 245), rgb(255, 204, 223), rgb(255, 200, 199), rgb(255, 216, 199), rgb(255, 221, 199))',
    'linear-gradient(160deg, rgb(204, 251, 252), rgb(197, 234, 254), rgb(189, 211, 255))',
    'linear-gradient(150deg, rgb(255, 242, 158), rgb(255, 239, 153), rgb(255, 231, 140), rgb(255, 217, 121), rgb(255, 197, 98), rgb(255, 171, 75), rgb(255, 143, 52), rgb(255, 115, 33), rgb(255, 95, 20), rgb(255, 87, 15))',
    'linear-gradient(345deg, rgb(211, 89, 255), rgb(228, 99, 255), rgb(255, 123, 247), rgb(255, 154, 218), rgb(255, 185, 208), rgb(255, 209, 214), rgb(255, 219, 219))',
    'linear-gradient(150deg, rgb(0, 224, 245), rgb(31, 158, 255), rgb(51, 85, 255))',
    'linear-gradient(330deg, rgb(255, 25, 125), rgb(45, 13, 255), rgb(0, 255, 179))',
    'linear-gradient(150deg, rgb(0, 176, 158), rgb(19, 77, 93), rgb(16, 23, 31))',
    'linear-gradient(150deg, rgb(95, 108, 138), rgb(48, 59, 94), rgb(14, 18, 38))'
  ];

  let activeGradient = Gradients[0];

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

  function handleGradientClick(gradient: string) {
    activeGradient = gradient;
  }
</script>

<div class="relative">

  <div>
    <div class="grid grid-cols-3 w-[300px]">
      {#each Gradients as gradient}
        <div style:background-image={gradient} class="w-10 h-10 rounded-md cursor-pointer" on:click={() => handleGradientClick(gradient)} aria-hidden>

        </div>
      {/each}
    </div>
  </div>

  {#if scaleVertical}
    <div transition:fade class="absolute top-0 bottom-0 left-0 w-4 transform -translate-x-[300%] flex items-center justify-center flex-col">
      <div class="w-full h-[1px] bg-slate-50"></div>
      <div class="w-[1px] bg-slate-50 flex-1"></div>
      <div class="text-sm py-8 text-slate-50 font-mono transform -rotate-90">{height}</div>
      <div class="w-[1px] bg-slate-50 flex-1"></div>
      <div class="w-full h-[1px] bg-slate-50"></div>
    </div>
  {/if}
  {#if scaleHorizontal}
    <div transition:fade class="absolute left-0 bottom-0 right-0 h-4 transform translate-y-[300%] flex items-center justify-center">
      <div class="h-full w-[1px] bg-slate-50"></div>
      <div class="h-[1px] bg-slate-50 flex-1"></div>
      <div class="text-sm px-8 text-slate-50 font-mono">{width}</div>
      <div class="h-[1px] bg-slate-50 flex-1"></div>
      <div class="h-full w-[1px] bg-slate-50"></div>
    </div>
  {/if}
  <div bind:this={ref} class="p-12 canvas relative flex items-center justify-center" style:width style:height>
    <div class="canvas-background absolute inset-0" style:background-image={activeGradient}></div>
    <div class="absolute inset-0 z-10">
      <div class="absolute w-5 h-5 cursor-ns-resize top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Corner onResize={(dx, dy) => handleResize("top", { dx, dy })} onResizeStart={() => handleResizeStart("top")} onResizeEnd={handleResizeStop} />
      </div>
      <div class="absolute w-5 h-5 cursor-ew-resize top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
        <Corner onResize={(dx, dy) => handleResize("right", { dx, dy })} onResizeStart={() => handleResizeStart("right")}  onResizeEnd={handleResizeStop} />
      </div>
      <div class="absolute w-5 h-5 cursor-ns-resize bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
        <Corner onResize={(dx, dy) => handleResize("bottom", { dx, dy })} onResizeStart={() => handleResizeStart("bottom")}  onResizeEnd={handleResizeStop} />
      </div>
      <div class="absolute w-5 h-5 cursor-ew-resize top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2">
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
}
</style>