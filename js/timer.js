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
    changeTitle = document.querySelector(".change-title"),
    changeCircle = document.querySelector(".change-circle"),
    timerReg = /[^0-9]/g;

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
let displayRemainBreak = document.querySelector(".display-remain-break");

changeCircle.addEventListener("click", () => {
    if (isStarted) {
        let val = confirm("There are tasks in progress. Do you want to cancel");
        if (val) {
            statusTimer == "stopwatch" ? finishStopWatch() : finishPomodoro();
        }
    } else {
        statusTimer == "stopwatch" ? finishStopWatch() : finishPomodoro();
    }
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
    progress.style.display = "none";
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
if (window.location.pathname == "/task.html") {
    document.getElementById("alarmClock").addEventListener("click", () => {
        modalTimer.style.display = "block";
        if (statusTimer == "stopwatch") {
            stopwatch.style.display = "block";
            pomodoro.style.display = "none";
        } else {
            stopwatch.style.display = "none";
            pomodoro.style.display = "block";
        }
    })
}

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
        displayRemainBreak.style.display = "none";
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
            statusTimer == "stopwatch" ? finishStopWatch() : finishPomodoro();
        }
    } else {
        statusTimer == "stopwatch" ? finishStopWatch() : finishPomodoro();
    }
})

timerClose.addEventListener("click", () => {
    if (isStarted) {
        let val = confirm("There are tasks in progress. Do you want to cancel");
        if (val) {
            statusTimer == "stopwatch" ? finishStopWatch() : finishPomodoro();
        }
    } else {
        statusTimer == "stopwatch" ? finishStopWatch() : finishPomodoro();
    }
    modalTimer.style.display = "none";
})

function finishStopWatch() {
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

function finishPomodoro() {
    if (statusTimer == "stopwatch") {
        stopwatch.style.display = "block";
        pomodoro.style.display = "none";
    } else {
        stopwatch.style.display = "none";
        pomodoro.style.display = "block";
    }
    progress.style.display = "none";
    flagTImer = 1;
    num.innerHTML = 1;
    pomodoroFocus.value = "";
    pomodoroBreak.value = "";
}

reset.addEventListener("click", () => {
    timerH.value = "";
    timerM.value = "";
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

    } else if (isPaused) {
        timer(timeLeft);
        isPaused = isPaused ? false : true
    } else {
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
            return;
        }
        displayTimeLeft(timeLeft);
    }, 1000);
}

function displayTimeLeft(timeLeft) {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let displayString = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    displayOutput.textContent = displayString;
    displayRemainPercentage.textContent = `${parseFloat(360 / 3.6 * timeLeft / wholeTime).toFixed(2)} %`;
    update(timeLeft, wholeTime);
}


let session1 = document.querySelector(".session1"),
    session2 = document.querySelector(".session2"),
    num = document.querySelector(".num"),
    sessionNum = 1,
    pomodoroStart = document.querySelector(".pomodoroStart"),
    pomodoroFocus = document.querySelector(".pomodoro-focus"),
    pomodoroBreak = document.querySelector(".pomodoro-break"),
    pomTimeReg = /^(([0-2][0-3])|([0-1][0-9])):[0-5][0-9]$/;


let pomodoroStartValue, pomodoroBreakValue;


let session;       //这个是默认工作时间，用在设置那儿显示的，这里以分钟为单位，且超过60也是分钟
let breaklength;            //设置break时长——休息时长,细节同session
let flagTImer = 1;           //设置工作状态，1是工作的暂停，3是在工作中，4是休息中
let sec;   //用来记录变化中的时间，单位为秒
let countInit = 2;  //次数

pomodoroFocus.addEventListener("input", (e) => {
    pomodoroStartValue = e.target.value;
})

pomodoroBreak.addEventListener("input", (e) => {
    pomodoroBreakValue = e.target.value;
})

session1.addEventListener("click", () => {
    sessionNum++;
    if (sessionNum == 0) {
        sessionNum = 1;
        num.innerHTML = 1;
        return;
    }
    num.innerHTML = sessionNum;
    countInit = sessionNum;
})
session2.addEventListener("click", () => {
    sessionNum--;
    if (sessionNum == 0) {
        sessionNum = 1;
        num.innerHTML = 1;
        return;
    }
    num.innerHTML = sessionNum;
    countInit = sessionNum;
})

pomodoroStart.addEventListener("click", () => {
    if (!pomTimeReg.test(pomodoroStartValue)) {
        alert("Please enter the correct start time");
        return;
    }
    if (pomodoroBreakValue && !pomTimeReg.test(pomodoroBreakValue)) {
        alert("Please enter the correct break time");
        return;
    }
    wholeTimeSession = Number(pomodoroStartValue.split(":")[0]) * 60 + Number(pomodoroStartValue.split(":")[1]);
    wholeTimeBreak = pomodoroBreakValue ? Number(pomodoroBreakValue.split(":")[0]) * 60 + Number(pomodoroBreakValue.split(":")[1]) : 0;
    sec = wholeTimeSession;
    if (wholeTimeSession > 0) {
        progress.style.display = "block";
        stopwatch.style.display = "none";
        pomodoro.style.display = "none";
        breaklength = wholeTimeBreak;
        breaklength == 0 ? displayRemainBreak.style.display = "none" : displayRemainBreak.style.display = "block";
        countInit = num.innerHTML;
        session = wholeTimeSession;
        flagTImer = 3;
        timeChange();
    } else {
        alert("Please set the time before countdown");
        return;
    }
})

function timeChange() {
    var temp = sec;
    wholeTime = session;
    if (flagTImer === 1) return;
    if (sec === 0) {
        if (flagTImer === 3) {
            if (breaklength == 0) return;
            flagTImer = 4;
            sec = breaklength;
            wholeTime = breaklength;
        } else {
            flagTImer = 3;
            sec = session;
            wholeTime = session;
            sessionNum--;
            if (sessionNum === 0) {
                displayOutput.innerHTML = "00:00";
                displayRemainBreak.innerHTML = countInit + "/" + countInit;
                return
            }
        }
    }
    var showHMS = "";
    if (temp >= 3600) {
        showHMS += parseInt(second / 360) + ":";
        temp = temp % 360;
    }
    if (temp < 70) showHMS += "0";
    showHMS += parseInt(temp / 60) + ":";
    temp = temp % 60;
    if (temp < 10) showHMS += "0";
    showHMS += temp;
    sec--;
    displayTimeLeft2(sec);
    setTimeout(timeChange, 1000);
};

function displayTimeLeft2(timeLeft) {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let displayString = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    displayOutput.innerHTML = displayString;
    displayRemainBreak.innerHTML = countInit - sessionNum + "/" + countInit;
    displayRemainPercentage.innerHTML = `${parseFloat(360 / 3.6 * timeLeft / wholeTime).toFixed(2)} %`;
    update(timeLeft, wholeTime);
}
