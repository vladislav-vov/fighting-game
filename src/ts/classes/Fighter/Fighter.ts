import { canvas, ctx, gravity } from '../../global'

import Sprite from '../Sprite/Sprite'

import IPosition from '../../interfaces/position.interface'
import {
	IFighterConstructor,
	IFighter,
	AnimationNamesType,
	IAnimationObjectProperties,
} from './fighter.interface'
import { ISpriteConstructor } from '../Sprite/sprite.interface'

export default class Fighter extends Sprite implements IFighter {
	velocity: IPosition
	width: number = 50
	height: number = 150
	color: string
	attackBox: {
		position: IPosition
		offset: IPosition
		width: number
		height: number
	}
	isAttacking: boolean = false
	private health = 100
	sprites: {
		[key in AnimationNamesType]: IAnimationObjectProperties
	}
	lastKey: string
	dead: boolean = false

	constructor({
		position,
		velocity,
		color = 'red',
		imageSrc,
		scale = 1,
		framesMax = 1,
		frameBuffer = 6,
		offset = { x: 0, y: 0 },
		sprites,
		attackBox,
	}: IFighterConstructor & ISpriteConstructor) {
		super({ position, imageSrc, scale, frameBuffer, framesMax, offset })

		this.velocity = velocity
		this.color = color
		this.attackBox = {
			position: {
				x: this.position.x,
				y: this.position.y,
			},
			width: attackBox.width,
			height: attackBox.height,
			offset: attackBox.offset,
		}
		this.sprites = sprites

		for (const sprite in this.sprites) {
			if (
				this.sprites.hasOwnProperty(sprite) &&
				!this.sprites[sprite as AnimationNamesType].image
			) {
				const image = new Image()
				image.src = this.sprites[sprite as AnimationNamesType].imageSrc
				this.sprites[sprite as AnimationNamesType].image = image
			}
		}
	}

	switchSprite(name: AnimationNamesType): void {
		if (this.image === this.sprites[name].image) return

		if (this.image === this.sprites.dead.image) {
			if (this.framesCurrent === this.sprites.dead.framesMax - 1) this.dead = true

			return
		}

		if (
			this.image === this.sprites.attack1.image &&
			this.framesCurrent < this.sprites.attack1.framesMax - 1
		) {
			return
		}

		if (
			this.image === this.sprites.takeHit.image &&
			this.framesCurrent < this.sprites.takeHit.framesMax - 1
		) {
			return
		}

		switch (name) {
			case 'idle':
				if (this.image !== this.sprites.idle.image) {
					this.framesElapsed = 0
					this.framesCurrent = 0
					this.framesMax = this.sprites[name].framesMax
					this.frameBuffer = this.sprites[name].frameBuffer
					this.image = this.sprites[name].image as HTMLImageElement
				}
				break
			case 'run':
				if (this.image !== this.sprites.run.image) {
					this.framesElapsed = 0
					this.framesCurrent = 0
					this.framesMax = this.sprites[name].framesMax
					this.frameBuffer = this.sprites[name].frameBuffer
					this.image = this.sprites[name].image as HTMLImageElement
				}
				break
			case 'jump':
				if (this.image !== this.sprites.jump.image) {
					this.framesElapsed = 0
					this.framesCurrent = 0
					this.framesMax = this.sprites[name].framesMax
					this.frameBuffer = this.sprites[name].frameBuffer
					this.image = this.sprites[name].image as HTMLImageElement
				}
				break
			case 'fall':
				if (this.image !== this.sprites.fall.image) {
					this.framesElapsed = 0
					this.framesCurrent = 0
					this.framesMax = this.sprites[name].framesMax
					this.frameBuffer = this.sprites[name].frameBuffer
					this.image = this.sprites[name].image as HTMLImageElement
				}
				break
			case 'attack1':
				if (this.image !== this.sprites.attack1.image) {
					this.framesElapsed = 0
					this.framesCurrent = 0
					this.framesMax = this.sprites[name].framesMax
					this.frameBuffer = this.sprites[name].frameBuffer
					this.image = this.sprites[name].image as HTMLImageElement
				}
				break
			case 'takeHit':
				if (this.image !== this.sprites.attack1.image) {
					this.framesElapsed = 0
					this.framesCurrent = 0
					this.framesMax = this.sprites[name].framesMax
					this.frameBuffer = this.sprites[name].frameBuffer
					this.image = this.sprites[name].image as HTMLImageElement
				}
				break
			case 'dead':
				if (this.image !== this.sprites.dead.image) {
					this.framesElapsed = 0
					this.framesCurrent = 0
					this.framesMax = this.sprites[name].framesMax
					this.frameBuffer = this.sprites[name].frameBuffer
					this.image = this.sprites[name].image as HTMLImageElement
				}
				break
		}
	}

	private drawFighterBlocks() {
		ctx.fillStyle = this.color
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

		ctx.fillStyle = 'green'
		ctx.fillRect(
			this.attackBox.position.x,
			this.attackBox.position.y,
			this.attackBox.width,
			this.attackBox.height
		)
	}

	update() {
		if (this.dead) {
			this.draw()
			return
		}

		super.update()

		this.attackBox.position.x = this.position.x + this.attackBox.offset.x
		this.attackBox.position.y = this.position.y + this.attackBox.offset.y

		this.position.x += this.velocity.x
		this.position.y += this.velocity.y

		if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
			this.velocity.y = 0
		} else this.velocity.y += gravity + 0.01
	}

	takeHit() {
		this.health -= 10

		if (this.health <= 0) {
			this.switchSprite('dead')
		} else this.switchSprite('takeHit')
	}

	attack() {
		this.isAttacking = true

		this.switchSprite('attack1')
	}

	getHealth(): number {
		return this.health
	}
}
