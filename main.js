const timer = document.querySelector('.timer')

let running = false
let paused = false
let time = 0
let startTime = -1
let pauseTime
let interval

timer.onclick = () => {
    if(running) resetTimer()
    else startTimer()
}

timer.oncontextmenu = (e) => {
    e.preventDefault();

    if(paused && running) goOnTimer()
    else if(running) pauseTimer()
}

function startTimer() {
    running = true
    paused = false
    startTime = new Date().getTime()
    interval = setInterval(onRunning, 1)
}

function resetTimer() {
    running = false
    paused = false
    clearInterval(interval)
    timer.innerHTML = timeToString(0)
}

function pauseTimer() {
    paused = true
    clearInterval(interval)
    pauseTime = new Date().getTime()
}

function goOnTimer() {
    paused = false
    startTime += new Date().getTime() - pauseTime
    interval = setInterval(onRunning, 1)
}

function timeToString(time) {
    const date = new Date(time)

    const ms = date.getMilliseconds().toString().padStart(3, '0')
    const s = date.getSeconds().toString().padStart(2, '0')
    const min = date.getMinutes().toString().padStart(2, '0')
    const h = (date.getHours() - 1).toString().padStart(2, '0')

    return `${h}:${min}:${s}.${ms}`
}

function onRunning() {
    time = new Date().getTime() - startTime
    timer.innerHTML = timeToString(time)
}