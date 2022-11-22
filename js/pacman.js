'use strict'

var PACMAN = `<img style="transform:rotate(0deg);" class="pacman-img" src="./imgs/pacman.png"/>`
var gPacman


// gCollectAudio.setAttribute('loop', 'loop')

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

}

function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]



    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost? call gameOver

    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            killGhost(nextLocation)
        } else {
            gameOver()
            return
        }
    }

    if (nextCell === FOOD) {
        updateScore(1)
        gGame.foodCount--
        checkWin()
        pushEmptyCell(nextLocation.i, nextLocation.j)
    }
    if (nextCell === CHERRY) {
        updateScore(10)
    }
    if (nextCell === POWER_FOOD) {
        if (gPacman.isSuper) return
        var superTimer = 5
        updateScore(1)
        POWER_FOOD_AUDIO.play()
        gPacman.isSuper = true
        var elSuperTimer = document.querySelector('.super-timer')
        elSuperTimer.classList.remove('hidden')
        elSuperTimer.innerText = superTimer
        // elSuperTimer.innerText = gSuperTimer
        var superInt = setInterval(() => {
            superTimer--
            elSuperTimer.innerText = superTimer
        }, 1000);
        setTimeout(() => {
            superTimer--
            gPacman.isSuper = false
            reviveGhost()
            clearInterval(superInt)
            var superTimer = 5
        }, 5000)

    }


    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)


    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)

}

function getNextLocation(eventKeyboard) {
    // console.log(eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            PACMAN = `<img style="transform:rotate(-90deg);" class="pacman-img" src="./imgs/pacman.png"/>`
            nextLocation.i--
            break;
        case 'ArrowRight':
            PACMAN = `<img style="transform:rotate(0deg);" class="pacman-img" src="./imgs/pacman.png"/>`
            nextLocation.j++
            break;
        case 'ArrowDown':
            PACMAN = `<img style="transform:rotate(90deg);" class="pacman-img" src="./imgs/pacman.png"/>`
            nextLocation.i++
            break;
        case 'ArrowLeft':
            PACMAN = `<img style="transform:rotate(180deg);" class="pacman-img" src="./imgs/pacman.png"/>`
            nextLocation.j--
            break;
    }
    return nextLocation
}

function pushEmptyCell(i, j) {
    gEmptyCells.push({
        i,
        j
    })
}