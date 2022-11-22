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

    // if (nextCell === GHOST) {
    //     if (gPacman.isSuper) {
    //         for (let i = 0; i < gGhosts.length; i++) {
    //             const ghost = gGhosts[i];
    //             if(ghost.location.i === location.i && ghost.location.j === location.j){
    //                 gGhosts.splice(i, 1)
    //             }
    //             if (nextCell === GHOST) {
    //                 if (ghost.currCellContent === FOOD) {
    //                     updateScore(1)
    //                     checkWin()
    //                     pushEmptyCell(nextLocation.i, nextLocation.j)
    //                 }
    //                 var eatenGhost = gGhosts.splice(i, 1)[0]
    //                 var eatenGhostTimeOut = setTimeout(() => {
    //                     gGhosts.push(eatenGhost)
    //                 }, 5000)
    //             }
    //         }
    //     } else {
    //         gameOver()
    //         return
    //     }
    // }


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
        updateScore(1)
        POWER_FOOD_AUDIO.play()
        gPacman.isSuper = true
        setTimeout(() => {
            gPacman.isSuper = false
            reviveGhost()
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
    const elPacmanImg = document.querySelector('.pacman-img')

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