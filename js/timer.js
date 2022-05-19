// Timer
let timer = document.querySelector(".timer"),
    modalTimer = document.querySelector(".modal-timer"),
    timerClose = document.querySelector(".timer-close"),
    timerHide = document.querySelector(".timer-hide"),
    stopwatch = document.querySelector(".stopwatch"),
    pomodoro = document.querySelector(".pomodoro"),
    start = document.querySelector(".start"),
    reset = document.querySelector(".reset"),
    timerH = document.getElementById("timer-h"),
    timerM = document.getElementById("timer-m"),

    // timerS = document.getElementById("timer-s"),
    changeTitle = document.querySelector(".change-title"),
    changeCircle = document.querySelector(".change-circle"),
    timerReg = /[^0-9]/g;
// timerReg = /([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])/;

let progress = document.querySelector(".progress");
let finish = document.querySelector(".finish");
let statusTimer = "stopwatch";
let wholeTime;
let progressBar = document.querySelector('.e-c-progress');
let indicator = document.getElementById('e-indicator');
let pointer = document.getElementById('e-pointer');
let length = Math.PI * 2 * 100;
progressBar.style.strokeDasharray = length;
let intervalTimer;
let timeLeft;
let isPaused = false;
let isStarted = false;
let displayOutput = document.querySelector('.display-remain-time');
let displayRemainPercentage = document.querySelector('.display-remain-percentage');

changeCircle.addEventListener("click", () => {
    if (changeTitle.classList == "change-title") {
        changeTitle.classList.add("active");
        changeTitle.innerHTML = "POMODORO";
        stopwatch.style.display = "none";
        pomodoro.style.display = "block";
        statusTimer = "";
    } else {
        changeTitle.classList.remove("active");
        changeTitle.innerHTML = "STOPWATCH";
        stopwatch.style.display = "block";
        pomodoro.style.display = "none";
        statusTimer = "stopwatch";
    }
})

timer.addEventListener("click", () => {
    modalTimer.style.display = "block";
    if (statusTimer == "stopwatch") {
        stopwatch.style.display = "block";
        pomodoro.style.display = "none";
    } else {
        stopwatch.style.display = "none";
        pomodoro.style.display = "block";
    }
})

timerClose.addEventListener("click", () => {
    if (isStarted) {
        let val = confirm("There are tasks in progress. Do you want to cancel");
        if (val) {
            finishHandle();
        }
    } else {
        finishHandle();
    }
    modalTimer.style.display = "none";
})

timerHide.addEventListener("click", () => {
    modalTimer.style.display = "none";
})

start.addEventListener("click", () => {
    let timerHVal = timerH.value,
        timerMVal = timerM.value;
    if (timerReg.test(timerHVal)) {
        alert("Hours can only be an integer");
        return;
    }
    if (timerReg.test(timerMVal) && timerMVal > 60) {
        alert("Minutes can only be an integer and less than or equal to 60");
        return;
    }
    wholeTime = Number(timerHVal) * 60 + timerMVal;
    if (wholeTime > 0) {
        progress.style.display = "block";
        stopwatch.style.display = "none";
        pomodoro.style.display = "none";
        update(wholeTime, wholeTime)
        pauseTimer();
    } else {
        alert("Please set the time before countdown");
        return;
    }
})

finish.addEventListener("click", () => {
    if (isStarted) {
        let val = confirm("There are tasks in progress. Do you want to cancel");
        if (val) {
            finishHandle();
        }
    } else {
        finishHandle();
    }
})

function finishHandle() {
    isStarted = false;
    isPaused = false;
    clearInterval(intervalTimer);
    if (statusTimer == "stopwatch") {
        stopwatch.style.display = "block";
        pomodoro.style.display = "none";
    } else {
        stopwatch.style.display = "none";
        pomodoro.style.display = "block";
    }
    progress.style.display = "none";
    timerH.value = "";
    timerM.value = "";
}

reset.addEventListener("click", () => {
    timerH.value = "";
    timerM.value = "";
    // timerS.value = "";
})

function update(value, timePercent) {
    var offset = -length - length * value / (timePercent);
    progressBar.style.strokeDashoffset = offset;
    pointer.style.transform = `rotate(${360 * value / (timePercent)}deg)`;
};

function pauseTimer() {
    if (isStarted === false) {
        timers(wholeTime);
        isStarted = true;
        // this.classList.remove('play');
        // this.classList.add('pause');

        // setterBtns.forEach(function (btn) {
        //     btn.disabled = true;
        //     btn.style.opacity = 0.5;
        // });

    } else if (isPaused) {
        // this.classList.remove('play');
        // this.classList.add('pause');
        timer(timeLeft);
        isPaused = isPaused ? false : true
    } else {
        // this.classList.remove('pause');
        // this.classList.add('play');
        clearInterval(intervalTimer);
        isPaused = isPaused ? false : true;
    }
}
function timers(seconds) { //counts time, takes seconds
    let remainTime = Date.now() + (seconds * 1000);
    displayTimeLeft(seconds);

    intervalTimer = setInterval(function () {
        timeLeft = Math.round((remainTime - Date.now()) / 1000);
        if (timeLeft < 0) {
            clearInterval(intervalTimer);
            isStarted = false;
            timerH.disabled = false;
            timerH.style.opacity = 1;
            timerM.disabled = false;
            timerM.style.opacity = 1;
            // displayTimeLeft(wholeTime);
            // pauseBtn.classList.remove('pause');
            // pauseBtn.classList.add('play');
            return;
        }
        displayTimeLeft(timeLeft);
    }, 1000);
}

function displayTimeLeft(timeLeft) { //displays time on the input
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let displayString = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    displayOutput.textContent = displayString;
    displayRemainPercentage.textContent = `${parseFloat(360 / 3.6 * timeLeft / wholeTime).toFixed(2)} %`;
    update(timeLeft, wholeTime);
}