<script lang="ts">
	import { getGradientStore } from './GradientsStore';
	import type { Gradient } from './types';

	const { gradients, setActiveGradient, activeGradient, padding } = getGradientStore();

	function handleGradientClick(gradient: Gradient) {
		setActiveGradient(gradient);
	}

  function handleMoreGradientsButtonClick() {

  }
</script>

<div class="bg-gray-100 w-[300px] p-4 space-y-8">
	<div>
		<div class="mb-3">Background</div>
		<div class="flex">
			<div class="grid grid-cols-6 gap-2 w-[300px]">
				{#each gradients as gradient}
					<div class="aspect-square">
						<div
							style:background-image={gradient.gradient}
							class="w-full h-full rounded-md cursor-pointer mx-auto {$activeGradient.id ===
							gradient.id
								? 'outline'
								: ''}"
							on:click={() => handleGradientClick(gradient)}
							aria-hidden
						/>
					</div>
				{/each}
        <div class="aspect-square">
          <button on:click={handleMoreGradientsButtonClick} class="w-full h-full rounded-md cursor-pointer mx-auto outline-dashed text-lg font-mono flex items-center justify-center">
            +
          </button>
        </div>
			</div>
		</div>
	</div>

  <div>
    <div class="mb-3 flex justify-between items-center">
      <div>Padding</div>
    </div>
		<div>
			<input class="w-full" type="range" bind:value={$padding} />
		</div>
  </div>
</div>
