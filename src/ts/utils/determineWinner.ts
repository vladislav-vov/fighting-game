import { timerId } from './decreaseTimer'

import { IDetermineWinnerPlayers } from './interfaces/determineWinner.interface'

const displayText = document.querySelector('#displayText') as HTMLDivElement

export default function determineWinner({ player1, player2 }: IDetermineWinnerPlayers): void {
	clearTimeout(timerId)

	if (!displayText) throw new Error('error!')

	displayText.style.display = 'flex'

	if (player1.getHealth() === player2.getHealth()) {
		displayText.innerHTML = 'Tie'
	} else if (player1.getHealth() > player2.getHealth()) {
		displayText.innerHTML = 'Player 1 wins'
	} else if (player1.getHealth() < player2.getHealth()) {
		displayText.innerHTML = 'Player 2 wins'
	}
}
