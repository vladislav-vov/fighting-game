import rectangleCollision from './rectangleCollision'

import { IHandlePlayerAttackParams } from './interfaces/handlePlayerAttack.interface'

export default function handlePlayerAttack({
	player1,
	player2,
	healthBarElem,
	frames,
}: IHandlePlayerAttackParams) {
	if (
		rectangleCollision({
			rectangle1: player1,
			rectangle2: player2,
		}) &&
		player1.isAttacking &&
		player1.framesCurrent === frames
	) {
		player1.isAttacking = false

		player2.takeHit()
		healthBarElem.style.width = `${player2.getHealth()}%`
	} else if (player1.isAttacking && player1.framesCurrent === frames) {
		player1.isAttacking = false
	}
}
