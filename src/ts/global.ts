export const canvas = document.querySelector('canvas') as HTMLCanvasElement
export const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
export const playerHealthElement = document.querySelector('#playerHealth') as HTMLDivElement
export const enemyHealthElement = document.querySelector('#enemyHealth') as HTMLDivElement
export const gravity = 0.5
