<script lang="ts">
	import type { Tweet } from './Tweet';
	import Moment from 'moment';
	import type { CanvasMode } from './types';
	import { getGradientStore } from './GradientsStore';
	import { is_client } from 'svelte/internal';

	export let width: string;
	export let height: string;
	export let tweet: Tweet | undefined;
	export let mode: CanvasMode;
	export let imageSRC: string;

	// function kFormatter(num: number) {
	// 	return Math.abs(num) > 999
	// 		? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
	// 		: Math.sign(num) * Math.abs(num);
	// }
	const {
		activeGradient,
		padding,
		borderRadius,
		scale,
		font,
		showResponse,
		cardGlassOpacity,
		cardGlassBlur
	} = getGradientStore();

	$: moment = tweet && Moment(tweet.createdAt);
	$: {
		if (is_client && !$font.isLoaded) {
			const link = document.createElement('link');
			link.href = $font.url;
			link.rel = 'stylesheet';
			link.crossOrigin = 'anonymous';
			document.head.appendChild(link);
			font.update((font) => {
				font.isLoaded = true;
				return font;
			});
		}
	}

	$: console.log($cardGlassBlur);
</script>

{#if tweet}
	<div
		class="max-w-[39em] relative z-0 transition-all w-full overflow-hidden shadow-xl"
		style:transform="scale({$scale / 100})"
		style:border-radius="{$borderRadius}px"
		style:font-family={$font.name}
	>
		<div
			class="card-background absolute inset-0"
			style:background-size="{width}
			{height}"
			style:opacity={$cardGlassOpacity}
			style="backdrop-filter: blur({$cardGlassBlur}px)"
		/>
		<div class="relative" style:padding={$padding + 'px'}>
			<div class="card-background-light absolute inset-0 -z-1" />
			{#if mode === 'Twitter'}
				<div>
					<div class="flex items-center mb-4">
						<img
							class="inline object-cover rounded-full transition-all duration-150 mr-3 w-12 h-12"
							src={tweet.user.profileImageURL.split('_normal')[0] + '.jpg'}
							alt={tweet.user.name}
						/>
						<div class="flex flex-col">
							<div class="whitespace-nowrap text-[#000] text-lg">{tweet.user.name}</div>
							<div class="whitespace-nowrap text-[#000] text-sm">@{tweet.user.username}</div>
						</div>
					</div>

					<div class="my-6">
						<div class="whitespace-pre-wrap text-xl text-[#222]">
							{tweet.text}
						</div>
					</div>

					<div class="text-sm">
						<div class="text-[#444]">{moment?.format('hh:mm A [·] MMM DD[,] YYYY')}</div>
						{#if $showResponse}
							<div class="mt-2 flex space-x-4">
								<div class="whitespace-nowrap text-[#555]">
									<span class="text-[#222] font-bold">{tweet.metrics.replies}</span> replies
								</div>
								<div class="whitespace-nowrap text-[#555]">
									<span class="text-[#222] font-bold">{tweet.metrics.retweets}</span> retweets
								</div>
								<div class="whitespace-nowrap text-[#555]">
									<span class="text-[#222] font-bold">{tweet.metrics.likes}</span> likes
								</div>
							</div>
						{/if}
					</div>
				</div>
			{:else}
				<img src={imageSRC} alt="Preview" style:border-radius="{$borderRadius}px" />
			{/if}
		</div>
	</div>
{/if}

<style>
	.card-background {
		background: rgba(255, 255, 255);
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.3);
	}
</style>
