import determineWinner from './determineWinner'

import { IDetermineWinnerPlayers } from './interfaces/determineWinner.interface'

const timerElem = document.querySelector('#timer') as HTMLDivElement
let timer = 60
export let timerId: NodeJS.Timeout

export default function decreaseTimer({ player1, player2 }: IDetermineWinnerPlayers) {
	if (timer > 0) {
		timerId = setTimeout(() => decreaseTimer({ player1, player2 }), 1000)
		timer--
		timerElem.innerHTML = timer.toString()
	}

	if (timer === 0) {
		determineWinner({
			player1,
			player2,
		})
	}
}
