<script lang="ts">
export let onResize: (dx: number, dy: number) => void;
export let onResizeStart: () => void;
export let onResizeEnd: () => void;

let ref: HTMLDivElement | undefined;
let isDragging = false;

function handlePointerDown(e: PointerEvent) {
  if (!ref) return;
  if (e.buttons > 1) return;
  isDragging = true;
  ref.setPointerCapture(e.pointerId);
  onResizeStart();
}

function handlePointerMove(e: PointerEvent) {
  if (isDragging) {
    onResize(e.movementX, e.movementY);
  }
}

function handlePointerUp(e: PointerEvent) {
  if (!ref) return;
  isDragging = false;
  ref.releasePointerCapture(e.pointerId);
  onResizeEnd();
}

</script>

<div
  bind:this={ref}
  class="resize-corner w-full h-full bg-white rounded-full absolute"
  on:pointerdown={handlePointerDown}
  on:pointermove={handlePointerMove}
  on:pointerup={handlePointerUp}
>

</div>

<style>

</style>