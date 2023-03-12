<script lang="ts">
import { getGradientStore } from "./GradientsStore";
import type { GradientType } from "./types";

const { gradients, setActiveGradient } = getGradientStore();

function handleGradientClick(gradient: GradientType) {
  setActiveGradient(gradient);
}

</script>

<div class="">
  <div class="grid grid-cols-3 w-[300px]">
    {#each gradients as gradient}
      <div style:background-image={gradient} class="w-10 h-10 rounded-md cursor-pointer" on:click={() => handleGradientClick(gradient)} aria-hidden></div>
    {/each}
  </div>
</div>