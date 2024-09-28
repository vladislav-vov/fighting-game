import Fighter from '../../classes/Fighter/Fighter'

export interface ISetSpriteVelocity {
	sprite: Fighter
	keyUp: {
		pressed: boolean
		speed: number
	}
	keyLeftIsPressed: boolean
	keyRightIsPressed: boolean
	keyAttack: boolean
	speed: number
}
