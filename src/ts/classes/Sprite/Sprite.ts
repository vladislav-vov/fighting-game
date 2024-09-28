import { ctx } from '../../global'

import IPosition from '../../interfaces/position.interface'
import { ISprite, ISpriteConstructor, ICropBox } from './sprite.interface'

export default class Sprite implements ISprite {
	position: IPosition
	image: HTMLImageElement = new Image()
	scale: number
	framesCurrent: number = 0
	framesMax: number
	framesElapsed: number = 0
	frameBuffer: number
	offset: IPosition

	constructor({
		position,
		imageSrc,
		scale = 1,
		framesMax = 1,
		frameBuffer = 5,
		offset = { x: 0, y: 0 },
	}: ISpriteConstructor) {
		this.position = position
		this.image.src = imageSrc
		this.scale = scale
		this.framesMax = framesMax
		this.frameBuffer = frameBuffer
		this.offset = offset
	}

	draw() {
		if (!this.image.complete) return

		const cropBox: ICropBox = {
			position: {
				x: this.framesCurrent * (this.image.width / this.framesMax),
				y: 0,
			},
			width: this.image.width / this.framesMax,
			height: this.image.height,
		}

		ctx.drawImage(
			this.image,
			cropBox.position.x,
			cropBox.position.y,
			cropBox.width,
			cropBox.height,
			this.position.x - this.offset.x,
			this.position.y - this.offset.y,
			(this.image.width / this.framesMax) * this.scale,
			this.image.height * this.scale
		)
	}

	update() {
		this.draw()
		this.updateFrames()
	}

	updateFrames() {
		if (this.framesMax < 2) return

		this.framesElapsed++

		if (this.framesElapsed % this.frameBuffer === 0) {
			if (this.framesCurrent < this.framesMax - 1) {
				this.framesCurrent++
			} else this.framesCurrent = 0
		}
	}
}
