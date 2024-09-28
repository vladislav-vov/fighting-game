import IPosition from '../../interfaces/position.interface'

export interface ISprite {
	position: IPosition
	image: HTMLImageElement
	scale: number
	framesCurrent: number
	framesMax: number
	framesElapsed: number
	frameBuffer: number
	offset: IPosition
	draw: () => void
	update: () => void
	updateFrames: () => void
}

export interface ISpriteConstructor {
	position: IPosition
	imageSrc: string
	scale?: number
	framesMax?: number
	frameBuffer?: number
	offset?: IPosition
}

export interface ICropBox {
	position: IPosition
	width: number
	height: number
}
