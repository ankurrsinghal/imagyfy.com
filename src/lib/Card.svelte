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
	const { padding, borderRadius, scale, font } = getGradientStore();

	$: moment = tweet && Moment(tweet.createdAt);
	$: {
		if (is_client && !$font.isLoaded) {
			const link = document.createElement('link');
			link.href = $font.url;
			link.rel = 'stylesheet';
			document.head.appendChild(link);
			font.update(font => {
				font.isLoaded = true;
				return font;
			});
		}
	}
</script>

{#if tweet}
	<div class="max-w-[39em] relative z-0 transition-all w-full card-holder overflow-hidden"
		style:transform="scale({$scale/100})"
		style:border-radius="{$borderRadius}px"
		style:font-family={$font.name}
	>
		<!-- <div class="card-background absolute inset-0" style:background-size="{width} {height}" /> -->
		<div class="relative" style:padding={$padding + 'px'} style:box-shadow="inset 0px 0px 20px 1px #111, inset 0px 0px 20px 1px #222">
			<!-- <div class="card-background-light absolute inset-0 -z-1" /> -->
			{#if mode === 'Twitter'}
				<div>
					<div class="flex items-center mb-4">
						<img
							class="inline object-cover rounded-full transition-all duration-150 mr-3 w-12 h-12"
							src={tweet.user.profileImageURL.split('_normal')[0] + '.jpg'}
							alt={tweet.user.name}
						/>
						<div class="flex flex-col">
							<div class="whitespace-nowrap text-[#bbb] text-lg">{tweet.user.name}</div>
							<div class="whitespace-nowrap text-[#bbb] text-sm">@{tweet.user.username}</div>
						</div>
					</div>

					<div class="my-6">
						<div class="whitespace-pre-wrap text-xl text-[#ddd]">
							{tweet.text}
						</div>
					</div>

					<div class="text-sm">
						<div class="mb-2 text-[#888]">{moment?.format('hh:mm A [·] MMM DD[,] YYYY')}</div>
						<div class="flex space-x-4">
							<div class="whitespace-nowrap text-[#555]">
								<span class="text-[#eee] font-bold">{tweet.metrics.replies}</span> replies
							</div>
							<div class="whitespace-nowrap text-[#555]">
								<span class="text-[#eee] font-bold">{tweet.metrics.retweets}</span> retweets
							</div>
							<div class="whitespace-nowrap text-[#555]">
								<span class="text-[#eee] font-bold">{tweet.metrics.likes}</span> likes
							</div>
						</div>
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
		background-image: linear-gradient(
			310deg,
			rgb(214, 233, 255),
			rgb(214, 229, 255),
			rgb(209, 214, 255),
			rgb(221, 209, 255),
			rgb(243, 209, 255),
			rgb(255, 204, 245),
			rgb(255, 204, 223),
			rgb(255, 200, 199),
			rgb(255, 216, 199),
			rgb(255, 221, 199)
		);
		z-index: -1;
	}

	.card-background::before,
	.card-background::after {
		position: absolute;
		content: '';
		left: 0;
		top: 3em;
		width: 100%;
		height: 100%;
		background-color: #0000002e;
		transform: translateZ(-1px);
		filter: blur(60px);
		z-index: -1;
	}

	.card-background::after {
		background-color: #0000002e;
		transform: translateZ(-1px);
		filter: blur(20px);
		left: 3%;
		right: 3%;
		width: initial;
		top: 1em;
	}

	.card-background-light {
		background-image: linear-gradient(
			-50deg,
			rgba(255, 255, 255, 0.5),
			rgba(255, 255, 255, 0.95) 80%
		);
		box-shadow: inset 0 0 0 2px #ffffff26;
		z-index: -1;
	}

	.card-holder {
		--positionX: 20px;
    --positionXOpposite: -20px;
    --positionY: 20px;
    --positionYOpposite: -20px;
    --angle: 145deg;
    --blur: 60px;
    --textColor: #001f3f;
    --textColorOpposite: #e0e0e0;
    --baseColor: #e0e0e0;
    --darkColor: #000;
    --lightColor: #222;
    --firstGradientColor: #111;
    --secondGradientColor: #222;
    --size: 250px;
    --radius: 50px;

		background: linear-gradient(var(--angle),var(--firstGradientColor),var(--secondGradientColor));
		box-shadow: var(--positionX) var(--positionY) var(--blur) var(--darkColor),var(--positionXOpposite) var(--positionYOpposite) var(--blur) var(--lightColor);
	}
</style>
