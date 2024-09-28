let lastTime = 0
let fps = 0

export default function getFps(timestamp: number): number {
	const deltaTime = timestamp - lastTime
	lastTime = timestamp
	fps = Math.floor(1 / (deltaTime / 1000))

	return fps
}
