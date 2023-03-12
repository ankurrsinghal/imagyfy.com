<script lang="ts">
	import type { Tweet } from './Tweet';
	import Moment from 'moment';
	import type { CanvasMode } from './types';
	import { getGradientStore } from './GradientsStore';

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
	const { padding } = getGradientStore();

	$: moment = tweet && Moment(tweet.createdAt);
</script>

{#if tweet}
	<div class="max-w-[39em] relative z-0 transition-all w-full card-holder">
		<div class="card-background absolute inset-0" style:background-size="{width} {height}" />
		<div class="relative" style:padding={$padding + 'px'}>
			<div class="card-background-light absolute inset-0 -z-1" />
			{#if mode === 'Twitter'}
				<div>
					<div class="flex items-center mb-4">
						<img
							class="inline object-cover rounded-full transition-all duration-150 mr-3"
							src={tweet.user.profileImageURL}
							alt={tweet.user.name}
						/>
						<div class="flex flex-col">
							<div class="whitespace-nowrap text-black text-xl">{tweet.user.name}</div>
							<div class="whitespace-nowrap text-gray-700 text-lg">@{tweet.user.username}</div>
						</div>
					</div>

					<div class="mb-4">
						<div class="whitespace-pre-wrap text-xl">
							{tweet.text}
						</div>
					</div>

					<div>
						<div class="mb-2 text-gray-400">{moment?.format('hh:mm A [·] MMM DD[,] YYYY')}</div>
						<div class="flex space-x-4">
							<div class="whitespace-nowrap text-gray-400">
								<span class="text-black font-bold">{tweet.metrics.replies}</span> replies
							</div>
							<div class="whitespace-nowrap text-gray-400">
								<span class="text-black font-bold">{tweet.metrics.retweets}</span> retweets
							</div>
							<div class="whitespace-nowrap text-gray-400">
								<span class="text-black font-bold">{tweet.metrics.likes}</span> likes
							</div>
						</div>
					</div>
				</div>
			{:else}
				<img src={imageSRC} alt="Preview" />
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
		border-radius: 1em;
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
		border-radius: 1em;
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
		border-radius: 1em;
		background-image: linear-gradient(
			-50deg,
			rgba(255, 255, 255, 0.5),
			rgba(255, 255, 255, 0.95) 80%
		);
		box-shadow: inset 0 0 0 2px #ffffff26;
		z-index: -1;
	}
</style>
