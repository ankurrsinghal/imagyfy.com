<script lang="ts">
	import { getGradientStore } from './GradientsStore';
	import type { Gradient } from './types';

	const { gradients, setActiveGradient, activeGradient } = getGradientStore();

	function handleGradientClick(gradient: Gradient) {
		setActiveGradient(gradient);
	}
</script>

<div class="bg-gray-100 w-[300px] p-4">
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
			</div>
		</div>
	</div>
</div>
