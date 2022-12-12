"use strict"

let $start = document.querySelector('#start'),
    $game = document.querySelector('#game'),
    $time = document.querySelector('#time'),
    $result = document.querySelector('#result'),
    $timeHeader = document.querySelector('#time-header'),
    $resultHeader = document.querySelector('#result-header'),
    $gameTime = document.querySelector('#game-time')

let score = 0;

let isGameStarted = false;

$start.addEventListener('click', startGame)

$game.addEventListener('click', handleBoxClick)

$gameTime.addEventListener('input', setGameTime)

function handleBoxClick(event) {
    if (!isGameStarted) {
        return
    }
    if (event.target.dataset.box) {
        score++
        renderBox()

    }

}

function setGameScore() {
    $result.textContent = score.toString()
}
function setGameTime() {
    let time = +$gameTime.value;
    $time.textContent = time.toFixed(1);
    show($timeHeader)
    hide($resultHeader)
}

function startGame() {
    setGameTime()
    score = 0;


    $gameTime.setAttribute('disabled', true)
    isGameStarted = true;

    $game.style.backgroundColor = '#fff'
    hide($start)


    let interval = setInterval(function () {

        let time = parseFloat($time.textContent)
        if (time <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1);
        }
    }, 100)

    renderBox()
}

function endGame() {
    isGameStarted = false;
    setGameScore()
    $gameTime.removeAttribute('disabled')

    show($start)
    $game.style.backgroundColor = '#ccc'
    $game.innerHTML = ''
    hide($timeHeader)
    show($resultHeader)

}

function show($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')

}

function renderBox() {

    let boxSize = getRandom(30, 100)
    let box = document.createElement('div')
    let gameSize = $game.getBoundingClientRect()
    let maxTop = gameSize.height - boxSize
    let maxLeft = gameSize.width - boxSize

    $game.innerHTML = ''
    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'

    box.style.backgroundColor = setColor()



    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)

}
function setColor() {
    let options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']
    let color = '#'
    for (let i = 0; i < 6; i++) {
        let rand = getRandom(0, options.length)
        color += options[rand]
    }
    return color
}