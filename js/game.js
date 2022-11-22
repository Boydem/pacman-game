'use strict'

const WALL = '🎄'
const FOOD = '.'
const EMPTY = ' '
const POWER_FOOD = '🍟'
const CHERRY = '🍒'
const POWER_FOOD_AUDIO = new Audio(`./audio/collect2.wav`)

const gGame = {
    score: 0,
    isOn: false,
    isWinner: false,
    foodCount: -1
}

var gBoard
var gEmptyCells
var gCherryInterval

function onInit() {
    gEmptyCells = []
    gGame.foodCount = -1
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    console.log('gGame.foodCount:', gGame.foodCount)
    gGame.isOn = true
    gGame.isWinner = false
    gCherryInterval = setInterval(spawnCherry, 15000)
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            } else if (i === 1 & j === 1 || i === 1 & j === 8 ||
                i === 8 & j === 8 || i === 8 & j === 1) {
                board[i][j] = POWER_FOOD
            } else {
                board[i][j] = FOOD
                gGame.foodCount++
            }
        }
    }
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score
}

function checkWin() {
    console.log('gGame.foodCount:', gGame.foodCount)
    if (gGame.foodCount === 0) {
        gGame.isWinner = true
        gameOver()
    }
}

function gameOver() {
    gGame.isOn = false
    const winner = {
        msg: 'GAME WON👽',
        btn: `RESTART GAME`,
        audio: `yay`
    }
    const looser = {
        msg: 'GAME OVER👻',
        btn: `TRY AGAIN`,
        audio: `nay`
    }
    const modalMsg = gGame.isWinner ? winner.msg : looser.msg
    const modalBtn = gGame.isWinner ? winner.btn : looser.btn
    const modalAudio = gGame.isWinner ? winner.audio : looser.audio
    const modal = document.querySelector('.modal-container')
    const elModalMsg = modal.querySelector('.gameover-msg')
    const elModalBtn = modal.querySelector('.gameover-btn')
    const superTimer = document.querySelector('.super-timer')
    superTimer.classList.add('hidden')
    var gameOverAudio = new Audio(`./audio/${modalAudio}.mp3`)
    gameOverAudio.play()
    elModalMsg.innerText = modalMsg
    elModalBtn.innerText = modalBtn
    modal.classList.remove('hidden')
    modal.style.transition = '0.5s all'
    modal.style.top = '55%'
    // TODO
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    renderCell(gPacman.location, '💤')
}

function onRestartGame() {
    const modal = document.querySelector('.modal-container')
    modal.style.top = '50%'
    modal.classList.add('hidden')
    gGhosts = []
    gGame.score = 0
    document.querySelector('h2 span').innerText = '0'
    onInit()
}


function spawnCherry() {
    var randIdx = getRandomIntInclusive(0, gEmptyCells.length - 1)
    // var cell = gEmptyCells.splice(randIdx, 1)[0]
    if (gEmptyCells[randIdx].i === gPacman.location.i && gEmptyCells[randIdx].j === gPacman.location.j) {
        return
    }
    var emptyCellLocation = gEmptyCells[randIdx]
    gBoard[emptyCellLocation.i][emptyCellLocation.j] = CHERRY

    renderCell(emptyCellLocation, CHERRY)
}