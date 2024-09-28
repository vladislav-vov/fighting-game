import { IKeyTracker, IKeys } from './keyTracker.interface'

export default class KeyTracker implements IKeyTracker {
	private keys: IKeys = {}

	constructor() {
		this.handleKeyDown = this.handleKeyDown.bind(this)
		this.handleKeyUp = this.handleKeyUp.bind(this)

		window.addEventListener('keydown', this.handleKeyDown)
		window.addEventListener('keyup', this.handleKeyUp)
	}

	private handleKeyUp(event: KeyboardEvent) {
		const key = event.key

		this.keys[key] = false
	}

	private handleKeyDown(event: KeyboardEvent) {
		const key = event.key

		this.keys[key] = true
	}

	isPressed(key: string): boolean {
		return this.keys[key]
	}

	dispose(): void {
		window.removeEventListener('keydown', this.handleKeyUp)
		window.removeEventListener('keydown', this.handleKeyUp)

		this.keys = {}
	}
}
