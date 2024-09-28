import { ctx } from '../global'
import getFps from './getFps'

export default function renderFps(timestamp: number) {
	ctx.font = '12px sans-serif'
	ctx.fillStyle = '#15ff00'
	ctx.fillText(`FPS: ${getFps(timestamp)}`, 10, 20)
}
