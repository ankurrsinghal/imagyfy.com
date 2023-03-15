<script lang="ts">
	import { fade } from 'svelte/transition';
	import Card from './Card.svelte';
	import Corner from './Corner.svelte';
	import { getGradientStore } from './GradientsStore';
	import { toPng as htmlToPNG } from 'html-to-image';
	import { loadingAction } from 'svelte-legos';
	import FileSaver from 'file-saver';
	import { DefaultDecodedTweet, LoadTweet, type Tweet } from './Tweet';
	import type { CanvasMode } from './types';

	export let droppedFile: File | undefined;

	let currentMode: CanvasMode = "Twitter";

	let canvasRef: HTMLDivElement | undefined;
	let rendererRef: HTMLDivElement | undefined;
	let __width = 800;
	let __height = 600;
	let scaleHorizontal = false;
	let scaleVertical = false;
	let isCanvasLoading = false;

	const MAX_WIDTH = 1080;
	const MIN_WIDTH = 425;

	const MAX_HEIGHT = 1080;
	const MIN_HEIGHT = 425;

	$: width = `${__width}px`;
	$: height = `${__height}px`;

	type Placement = 'top' | 'right' | 'bottom' | 'left';

	function handleResize(placement: Placement, { dx, dy }: { dx: number; dy: number }) {
		if (!canvasRef) return;
		let width = __width;
		let height = __height;

		if (placement === 'top') height -= 2 * dy;
		if (placement === 'right') width += 2 * dx;
		if (placement === 'bottom') height += 2 * dy;
		if (placement === 'left') width -= 2 * dx;

		if (width !== __width && width >= MIN_WIDTH && width <= MAX_WIDTH) __width = width;
		if (height !== __height && height >= MIN_HEIGHT && height <= MAX_HEIGHT) __height = height;
	}

	function handleResizeStart(placement: Placement) {
		if (placement === 'top' || placement === 'bottom') scaleVertical = true;
		if (placement === 'left' || placement === 'right') scaleHorizontal = true;
	}

	function handleResizeStop() {
		scaleHorizontal = false;
		scaleVertical = false;
	}

	function handleDownloadClick() {
		if (rendererRef) {
			isCanvasLoading = true;
			setTimeout(() => {
				if (rendererRef) {
					htmlToPNG(rendererRef)
						.then((dataURL) => {
							FileSaver.saveAs(dataURL, 'my-node.png');
							isCanvasLoading = false;
						})
						.catch((e) => {
							isCanvasLoading = false;
						});
				}
			}, 1200);
		}
	}

	const { activeGradient } = getGradientStore();

	let tweetURL = '';
	let lastTweetId = '';

	let tweet: Tweet | undefined = DefaultDecodedTweet;

  function last<T>(array: T[]) {
    return array[array.length - 1];
  }

	function handleTweetURLChange() {
    if (/^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)$/.test(tweetURL)) {
      const tweetId = last(tweetURL.split('/'));
      if (tweetId && lastTweetId !== tweetId && /^\d+$/g.test(tweetId)) {
				isCanvasLoading = true;
        console.log("fire");
				LoadTweet(tweetId).then(tweetData => {
					if (tweetData) {
						currentMode = "Twitter";
						tweet = tweetData;
					}
				}).finally(() => {
					isCanvasLoading = false;
					lastTweetId = tweetId;
				});
      }
    }
  }

	let uploadInputRef: HTMLInputElement;
	let imageSRC = '';

	function renderImage(file: File) {
		currentMode = "Upload";
		imageSRC = URL.createObjectURL(file);
	}

	function handleUpload() {
		const files = uploadInputRef.files;
		if (files && files.length > 0) {
			const file = files[0];
			renderImage(file);
		}
	}

	$: {
		if (droppedFile) {
			if (droppedFile.type.includes('image')) {
				renderImage(droppedFile);
			}
		}
	}
</script>

<div use:loadingAction={isCanvasLoading} class="relative flex-1 flex items-center justify-center">
	<div
		class="absolute top-4 px-4 flex items-center space-x-4"
	>
		<input
			bind:value={tweetURL}
			on:input={handleTweetURLChange}
			class="px-4 py-2 bg-black rounded-md text-white shadow-lg"
			placeholder="Enter Tweet URL"
		/>
		<div class="relative cursor-pointer">
			<button
				class="px-4 py-2 bg-black rounded-md text-white shadow-lg pointer-events-none">or Upload Image</button
			>
			<input class="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" bind:this={uploadInputRef} type="file" on:change={handleUpload} />
		</div>
	</div>
	{#if scaleVertical}
		<div
			transition:fade
			class="absolute top-0 bottom-0 left-0 w-4 transform -translate-x-[200%] flex items-center justify-center flex-col"
		>
			<div class="w-full h-[1px] bg-slate-50" />
			<div class="w-[1px] bg-slate-50 flex-1" />
			<div class="text-xs py-8 text-slate-50 font-mono transform -rotate-90">{height}</div>
			<div class="w-[1px] bg-slate-50 flex-1" />
			<div class="w-full h-[1px] bg-slate-50" />
		</div>
	{/if}
	{#if scaleHorizontal}
		<div
			transition:fade
			class="absolute left-0 bottom-0 right-0 h-4 transform translate-y-[200%] flex items-center justify-center"
		>
			<div class="h-full w-[1px] bg-slate-50" />
			<div class="h-[1px] bg-slate-50 flex-1" />
			<div class="text-xs px-8 text-slate-50 font-mono">{width}</div>
			<div class="h-[1px] bg-slate-50 flex-1" />
			<div class="h-full w-[1px] bg-slate-50" />
		</div>
	{/if}
	<div bind:this={canvasRef} class="canvas relative" style:width style:height>
		<div class="absolute inset-0 z-10">
			<div
				class="absolute group w-4 h-4 cursor-ns-resize top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
			>
				<Corner
					onResize={(dx, dy) => handleResize('top', { dx, dy })}
					onResizeStart={() => handleResizeStart('top')}
					onResizeEnd={handleResizeStop}
				/>
			</div>
			<div
				class="absolute group w-4 h-4 cursor-ew-resize top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2"
			>
				<Corner
					onResize={(dx, dy) => handleResize('right', { dx, dy })}
					onResizeStart={() => handleResizeStart('right')}
					onResizeEnd={handleResizeStop}
				/>
			</div>
			<div
				class="absolute group w-4 h-4 cursor-ns-resize bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
			>
				<Corner
					onResize={(dx, dy) => handleResize('bottom', { dx, dy })}
					onResizeStart={() => handleResizeStart('bottom')}
					onResizeEnd={handleResizeStop}
				/>
			</div>
			<div
				class="absolute group w-4 h-4 cursor-ew-resize top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2"
			>
				<Corner
					onResize={(dx, dy) => handleResize('left', { dx, dy })}
					onResizeStart={() => handleResizeStart('left')}
					onResizeEnd={handleResizeStop}
				/>
			</div>
		</div>
		<div bind:this={rendererRef} class="absolute p-12 inset-0 flex items-center justify-center">
			<div
				class="canvas-background absolute inset-0 rounded-xl"
				style:background="#222"
			/>
			<Card tweet={tweet} imageSRC={imageSRC} mode={currentMode} {width} {height} />
		</div>
	</div>

	<button
		on:click={handleDownloadClick}
		class="absolute bottom-4 px-4 py-2 bg-black rounded-md text-white shadow-lg">Download</button
	>
</div>

<style>
	.canvas {
		width: 800px;
		height: 600px;
	}

	.canvas-background {
		box-shadow: #ffffff26 0 0 0 1px, #32325d45 0 80px 120px -20px, #0000004d 0 30px 60px -10px;
	}
</style>
