import { canvas, ctx, playerHealthElement, enemyHealthElement } from './global'

import { KeyTracker, Sprite, Fighter } from './classes'

import {
	setSpriteVelocity,
	renderFps,
	rectangleCollision,
	decreaseTimer,
	determineWinner,
	handlePlayerAttack,
} from './utils'

canvas.width = 1024
canvas.height = 576

const keyTracker = new KeyTracker()

const background = new Sprite({
	position: {
		x: 0,
		y: 0,
	},
	imageSrc: './assets/img/background.png',
})

const shop = new Sprite({
	position: {
		x: 630,
		y: 122,
	},
	imageSrc: './assets/img/shop.png',
	scale: 2.8,
	framesMax: 6,
})

const player = new Fighter({
	position: {
		x: 50,
		y: 0,
	},
	velocity: {
		x: 0,
		y: 0,
	},
	color: '#92ABEA',
	imageSrc: './assets/img/samuraiMack/Idle.png',
	framesMax: 8,
	scale: 2.5,
	offset: {
		x: 215,
		y: 156,
	},
	sprites: {
		idle: {
			imageSrc: './assets/img/samuraiMack/Idle.png',
			framesMax: 8,
			frameBuffer: 5,
		},
		run: {
			imageSrc: './assets/img/samuraiMack/Run.png',
			framesMax: 8,
			frameBuffer: 5,
		},
		jump: {
			imageSrc: './assets/img/samuraiMack/Jump.png',
			framesMax: 2,
			frameBuffer: 2,
		},
		fall: {
			imageSrc: './assets/img/samuraiMack/Fall.png',
			framesMax: 2,
			frameBuffer: 2,
		},
		attack1: {
			imageSrc: './assets/img/samuraiMack/Attack1.png',
			framesMax: 6,
			frameBuffer: 4,
		},
		takeHit: {
			imageSrc: './assets/img/samuraiMack/Take Hit - white silhouette.png',
			framesMax: 4,
			frameBuffer: 4,
		},
		dead: {
			imageSrc: './assets/img/samuraiMack/Death.png',
			framesMax: 6,
			frameBuffer: 5,
		},
	},
	attackBox: {
		offset: {
			x: 10,
			y: 30,
		},
		width: 245,
		height: 70,
	},
})

const enemy = new Fighter({
	position: {
		x: 500,
		y: 0,
	},
	velocity: {
		x: 0,
		y: 0,
	},
	color: '#E86262',
	imageSrc: './assets/img/kenji/Idle.png',
	framesMax: 4,
	scale: 2.5,
	offset: {
		x: 215,
		y: 171,
	},
	sprites: {
		idle: {
			imageSrc: './assets/img/kenji/Idle.png',
			framesMax: 4,
			frameBuffer: 5,
		},
		run: {
			imageSrc: './assets/img/kenji/Run.png',
			framesMax: 8,
			frameBuffer: 5,
		},
		jump: {
			imageSrc: './assets/img/kenji/Jump.png',
			framesMax: 2,
			frameBuffer: 2,
		},
		fall: {
			imageSrc: './assets/img/kenji/Fall.png',
			framesMax: 2,
			frameBuffer: 2,
		},
		attack1: {
			imageSrc: './assets/img/kenji/Attack1.png',
			framesMax: 4,
			frameBuffer: 6,
		},
		takeHit: {
			imageSrc: './assets/img/kenji/Take hit.png',
			framesMax: 3,
			frameBuffer: 3,
		},
		dead: {
			imageSrc: './assets/img/kenji/Death.png',
			framesMax: 7,
			frameBuffer: 5,
		},
	},
	attackBox: {
		offset: {
			x: -170,
			y: 30,
		},
		width: 180,
		height: 70,
	},
})

decreaseTimer({ player1: player, player2: enemy })

function animate(timestamp: number) {
	requestAnimationFrame(animate)

	ctx.fillStyle = 'black'
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	background.update()
	shop.update()

	renderFps(timestamp)

	if (keyTracker.isPressed('a')) {
		player.lastKey = 'a'
	}
	
	if (keyTracker.isPressed('d')) {
		player.lastKey = 'd'
	}

	if (keyTracker.isPressed('ArrowRight')) {
		player.lastKey = 'ArrowRight'
	}
	
	if (keyTracker.isPressed('ArrowLeft')) {
		player.lastKey = 'ArrowLeft'
	}

	setSpriteVelocity({
		sprite: player,
		keyUp: {
			pressed: keyTracker.isPressed('w'),
			speed: 15,
		},
		keyLeftIsPressed: keyTracker.isPressed('a') && player.lastKey === 'a',
		keyRightIsPressed: keyTracker.isPressed('d') && player.lastKey === 'd',
		keyAttack: keyTracker.isPressed('s'),
		speed: 5,
	})

	setSpriteVelocity({
		sprite: enemy,
		keyUp: {
			pressed: keyTracker.isPressed('ArrowUp'),
			speed: 15,
		},
		keyLeftIsPressed: keyTracker.isPressed('ArrowLeft') && player.lastKey === 'ArrowLeft',
		keyRightIsPressed: keyTracker.isPressed('ArrowRight') && player.lastKey === 'ArrowRight',
		keyAttack: keyTracker.isPressed('ArrowDown'),
		speed: 5,
	})

	handlePlayerAttack({
		player1: player,
		player2: enemy,
		healthBarElem: enemyHealthElement,
		frames: 4,
	})
	handlePlayerAttack({
		player1: enemy,
		player2: player,
		healthBarElem: playerHealthElement,
		frames: 2,
	})

	if (enemy.getHealth() <= 0 || player.getHealth() <= 0) {
		determineWinner({ player1: player, player2: enemy })
	}
}

requestAnimationFrame(animate)
