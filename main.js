const timer = document.querySelector('.timer')

let running = false
let time = 0
let startTime
let pauseTime
let interval

timer.onclick = () => {
    running = !running

    if(!running) resetTimer()
    else startTimer()
}

function resetTimer() {
    running = false
    clearInterval(interval)
    timer.innerHTML = timeToString(0)
}

function pauseTimer() {
    running = false
    clearInterval(interval)
    pauseTime = new Date().getTime()
}

function goOnTimer() {
    running = true
    startTime += new Date().getTime() - pauseTime
    interval = setInterval(onRunning, 1)
}

function startTimer() {
    running = true
    startTime = new Date().getTime()
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