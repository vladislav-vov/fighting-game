import { ISetSpriteVelocity } from './interfaces/setSpriteVelocity.interface'

export default function setSpriteVelocity({
	sprite,
	keyUp,
	keyLeftIsPressed,
	keyRightIsPressed,
	keyAttack,
	speed,
}: ISetSpriteVelocity) {
	if (!sprite.velocity) {
		throw new Error(`The object has no property velocity`)
	}

	if (sprite.velocity.y === 0 && keyUp.pressed) {
		sprite.velocity.y = -keyUp.speed
	}

	if (keyAttack && sprite.attack) {
		sprite.attack()
	}

	sprite.velocity.x = 0

	if (keyLeftIsPressed) {
		sprite.velocity.x = -speed
		sprite.switchSprite('run')
	} else if (keyRightIsPressed) {
		sprite.velocity.x = speed
		sprite.switchSprite('run')
	} else {
		sprite.switchSprite('idle')
	}

	if (sprite.velocity.y < 0) {
		sprite.switchSprite('jump')
	} else if (sprite.velocity.y > 0) {
		sprite.switchSprite('fall')
	}

	sprite.update()
}
