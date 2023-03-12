import { getContext, setContext } from 'svelte';
import { writable, type Readable } from 'svelte/store';
import type { Gradient, GradientType } from './types';

const gradientsTypes: GradientType[] = [
	'linear-gradient(310deg, rgb(214, 233, 255), rgb(214, 229, 255), rgb(209, 214, 255), rgb(221, 209, 255), rgb(243, 209, 255), rgb(255, 204, 245), rgb(255, 204, 223), rgb(255, 200, 199), rgb(255, 216, 199), rgb(255, 221, 199))',
	'linear-gradient(160deg, rgb(204, 251, 252), rgb(197, 234, 254), rgb(189, 211, 255))',
	'linear-gradient(150deg, rgb(255, 242, 158), rgb(255, 239, 153), rgb(255, 231, 140), rgb(255, 217, 121), rgb(255, 197, 98), rgb(255, 171, 75), rgb(255, 143, 52), rgb(255, 115, 33), rgb(255, 95, 20), rgb(255, 87, 15))',
	'linear-gradient(345deg, rgb(211, 89, 255), rgb(228, 99, 255), rgb(255, 123, 247), rgb(255, 154, 218), rgb(255, 185, 208), rgb(255, 209, 214), rgb(255, 219, 219))',
	'linear-gradient(150deg, rgb(0, 224, 245), rgb(31, 158, 255), rgb(51, 85, 255))',
	'linear-gradient(330deg, rgb(255, 25, 125), rgb(45, 13, 255), rgb(0, 255, 179))',
	'linear-gradient(150deg, rgb(0, 176, 158), rgb(19, 77, 93), rgb(16, 23, 31))',
	'linear-gradient(150deg, rgb(95, 108, 138), rgb(48, 59, 94), rgb(14, 18, 38))'
];

const gradients: Gradient[] = gradientsTypes.map((gradient, index) => ({ id: index.toString(), gradient }));

interface GradientStoreProps {
	gradients: Gradient[];
	activeGradient: Readable<Gradient>;
	setActiveGradient: (gradient: Gradient) => void;
}

const GRADIENT_STORE_KEY = Symbol('GradientStore');

export function setupGradientStore() {
	const { set, subscribe } = writable(gradients[0]!);

	const activeGradient: Readable<Gradient> = { subscribe };

	setContext<GradientStoreProps>(GRADIENT_STORE_KEY, {
		gradients,
		activeGradient,
		setActiveGradient: set
	});
}

export function getGradientStore() {
	return getContext<GradientStoreProps>(GRADIENT_STORE_KEY);
}
