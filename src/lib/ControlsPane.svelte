<script lang="ts">
	import { getGradientStore } from './GradientsStore';
	import type { Gradient } from './types';

	const {
		gradients,
		setActiveGradient,
		activeGradient,
		padding,
		borderRadius,
		scale,
		fonts,
		font,
		showResponse,
		cardGlassOpacity,
		cardGlassBlur
	} = getGradientStore();

	function handleGradientClick(gradient: Gradient) {
		setActiveGradient(gradient);
	}

	function handleMoreGradientsButtonClick() {}

	function handleFontChange() {}
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
					<button
						on:click={handleMoreGradientsButtonClick}
						class="w-full h-full rounded-md cursor-pointer mx-auto outline-dashed text-lg font-mono flex items-center justify-center"
					>
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

	<div>
		<div class="mb-3 flex justify-between items-center">
			<div>Border Radius</div>
		</div>
		<div>
			<input class="w-full" type="range" max="50" bind:value={$borderRadius} />
		</div>
	</div>

	<div>
		<div class="mb-3 flex justify-between items-center">
			<div>Scale</div>
		</div>
		<div>
			<input class="w-full" type="range" min="50" max="150" bind:value={$scale} />
		</div>
	</div>

	<div>
		<div class="mb-3 flex justify-between items-center">
			<div>Font</div>
		</div>
		<div>
			<select bind:value={$font} class="px-4 py-2 rounded-lg">
				{#each fonts as font}
					<option value={font}>
						{font.name}
					</option>
				{/each}
			</select>
		</div>
	</div>

	<div>
		<div class="mb-3 flex justify-between items-center">
			<div>Show Responses</div>
		</div>
		<div>
			<input type="checkbox" bind:checked={$showResponse} />
		</div>
	</div>

	<div>
		<div class="mb-3 flex justify-between items-center">
			<div>Glass Transparency</div>
		</div>
		<div>
			<input
				class="w-full"
				type="range"
				min={0}
				max={1}
				step={0.01}
				bind:value={$cardGlassOpacity}
			/>
		</div>
	</div>

	<div>
		<div class="mb-3 flex justify-between items-center">
			<div>Glass Blur</div>
		</div>
		<div>
			<input class="w-full" type="range" min={0} max={20} step={0.1} bind:value={$cardGlassBlur} />
		</div>
	</div>
</div>
