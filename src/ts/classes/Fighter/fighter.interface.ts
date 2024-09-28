import IPosition from '../../interfaces/position.interface'

export type AnimationNamesType = 'run' | 'idle' | 'jump' | 'fall' | 'attack1' | 'takeHit' | 'dead'

export interface IAnimationObjectProperties {
	imageSrc: string
	framesMax: number
	image?: HTMLImageElement
	frameBuffer: number
}

export interface IFighterConstructor {
	position: IPosition
	velocity: IPosition
	color?: string
	sprites: {
		[key in AnimationNamesType]: IAnimationObjectProperties
	}
	attackBox: {
		offset: IPosition
		width: number
		height: number
	}
}

export interface IFighter {
	position: IPosition
	velocity: IPosition
	width: number
	height: number
	color: string
	attackBox: {
		position: IPosition
		offset: IPosition
		width: number
		height: number
	}
	isAttacking: boolean
	lastKey: string
	dead: boolean
	draw: () => void
	update: () => void
	attack: () => void
	switchSprite: (name: AnimationNamesType) => void
	getHealth: () => number
	takeHit: () => void
}
