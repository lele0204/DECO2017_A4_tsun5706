// get page dom
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
let length = -Math.PI * 2 * 100;
progressBar.style.strokeDasharray = length;
let intervalTimer;
let timeLeft;
let isPaused = false;
let isStarted = false;
let displayOutput = document.querySelector('.display-remain-time');
let displayRemainPercentage = document.querySelector('.display-remain-percentage');
let displayRemainBreak = document.querySelector(".display-remain-break");

// StopWatch and Pomodoro change
changeCircle.addEventListener("click", () => {
    if (isStarted) {
        let val = confirm("There are tasks in progress. Do you want to cancel");
        if (val) {
            statusTimer == "stopwatch" ? finishStopWatch() : finishPomodoro();
        }
    } else {
        statusTimer == "stopwatch" ? finishStopWatch() : finishPomodoro();
    }
    if (!isStarted) {
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
    }
    progress.style.display = "none";
})

// Set default initialization presentation
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
// Determine whether to set the click event when task page is selected
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
// timer hide handle
timerHide.addEventListener("click", () => {
    modalTimer.style.display = "none";
})

// StopWatch start
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
    intervalTimer = setInterval(() => {
        timerMVal--;
        console.log(timerHVal, timerMVal)
        if ((timerHVal == 0 || timerHVal == "") && (timerMVal == 0 || timerMVal == "")) {
            timerH.disabled = false;
            timerM.disabled = false;
            start.disabled = false;
            timerH.value = "";
            timerM.value = "";
            isStarted = false;
            clearInterval(intervalTimer);
            return false;
        }
        if (timerMVal < 0) {
            timerHVal--;
            timerMVal = 59;
        }
        isStarted = true;
        timerH.disabled = true;
        timerM.disabled = true;
        start.disabled = true;
        timerH.value = timerHVal < 10 ? timerHVal == "" ? "00" : `0${timerHVal}` : timerHVal;
        timerM.value = timerMVal < 10 ? timerMVal == "" ? "00" : `0${timerMVal}` : timerMVal;
    }, 1000);
})
// StopWatch reset 
reset.addEventListener("click", () => {
    isStarted = false;
    timerH.value = "";
    timerM.value = "";
    timerH.disabled = false;  //set timer input disabled false
    timerM.disabled = false;
    start.disabled = false; //set timer button disabled false
    clearInterval(intervalTimer);  //Clear timer
})
// StopWatch finish handle
function finishStopWatch() {
    if (statusTimer == "stopwatch") {
        stopwatch.style.display = "none";
        pomodoro.style.display = "block";
    } else {
        stopwatch.style.display = "block";
        pomodoro.style.display = "none";
    }
    progress.style.display = "none";
}
// Pomodoro finish handle
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
// Pomodoro finish show
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
// StopWatch close
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

// progess update function
function update(value, timePercent) {
    var offset = -length - length * value / (timePercent);
    progressBar.style.strokeDashoffset = offset;
    pointer.style.transform = `rotate(${-360 * value / (timePercent)}deg)`;
};

// Pomodoro dom
let session1 = document.querySelector(".session1"),
    session2 = document.querySelector(".session2"),
    num = document.querySelector(".num"),
    sessionNum = 1,
    pomodoroStart = document.querySelector(".pomodoroStart"),
    pomodoroFocus = document.querySelector(".pomodoro-focus"),
    pomodoroBreak = document.querySelector(".pomodoro-break"),
    pomTimeReg = /^(([0-2][0-3])|([0-1][0-9])):[0-5][0-9]$/;
let pomodoroStartValue, pomodoroBreakValue;


let session; //This is the default working time, which is displayed in the setting. Here, it is in minutes, and more than 60 minutes are also minutes
let breaklength; //Set break duration - break duration. The details are the same as session
let flagTImer = 1; //Set the working status. 1 refers to the suspension of work, 3 refers to the work in progress, and 4 refers to the rest
let sec; //It is used to record the changing time in seconds
let countInit = 2;  //frequency

// set pomodoro focus time
pomodoroFocus.addEventListener("input", (e) => {
    pomodoroStartValue = e.target.value;
})
// set pomodoro break time
pomodoroBreak.addEventListener("input", (e) => {
    pomodoroBreakValue = e.target.value;
})
// add SESSION
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
// reduce SESSION
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
// pomodoro start
pomodoroStart.addEventListener("click", () => {
    if (!pomTimeReg.test(pomodoroStartValue)) {  //rule focus time
        alert("Please enter the correct start time");
        return;
    }
    if (pomodoroBreakValue && !pomTimeReg.test(pomodoroBreakValue)) {  //rule break time
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
// time change
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
// progess show 
function displayTimeLeft2(timeLeft) {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let displayString = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    displayOutput.innerHTML = displayString;
    displayRemainBreak.innerHTML = countInit - sessionNum + "/" + countInit;
    displayRemainPercentage.innerHTML = `${(100 - parseFloat(360 / 3.6 * timeLeft / wholeTime)).toFixed(2)} %`;
    update(timeLeft, wholeTime);
}
