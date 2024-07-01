declare module "dat.gui" {
	export class GUI {
		constructor(options?: GUIOptions);
		add(
			target: object,
			propName: string,
			min?: number,
			max?: number,
			step?: number
		): GUIController;
		add(target: object, propName: string, status: boolean): GUIController;
		addColor(target: object, propName: string): GUIController;
		remove(controller: GUIController): void;
		destroy(): void;
	}

	export interface GUIOptions {
		autoPlace?: boolean;
		width?: number;
		closed?: boolean;
		load?: any;
		preset?: string;
		parent?: HTMLElement;
	}

	export interface GUIController {
		onChange(callback: (value: any) => void): GUIController;
		onFinishChange(callback: (value: any) => void): GUIController;
		setValue(value: any): GUIController;
		getValue(): any;
		min(min: number): GUIController;
		max(max: number): GUIController;
		step(step: number): GUIController;
		updateDisplay(): void;
		options(options: any): GUIController;
		name(name: string): GUIController;
		listen(): GUIController;
		remove(): void;
	}
}
