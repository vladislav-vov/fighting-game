import { IFighter } from '../../classes/Fighter/fighter.interface'
import { ISprite } from '../../classes/Sprite/sprite.interface'

export interface IHandlePlayerAttackParams {
	player1: IFighter & ISprite
	player2: IFighter & ISprite
	healthBarElem: HTMLDivElement
	frames: number
}
