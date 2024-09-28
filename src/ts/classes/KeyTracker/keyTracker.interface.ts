export interface IKeyTracker {
	isPressed: (key: string) => void
	dispose: () => void
}

export interface IKeys {
	[key: string]: boolean
}
