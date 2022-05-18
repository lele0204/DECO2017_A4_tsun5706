let play = document.querySelector("#play"),
    audio = document.querySelector("#audio"),
    musicImage = document.querySelector(".musicImage"),
    names = document.querySelector(".names"),
    authors = document.querySelector(".authors"),
    next = document.querySelector(".next"),
    prev = document.querySelector(".prev"),
    totalTime = document.querySelector("#totalTime"),
    presentTime = document.querySelector("#presentTime"),
    modalMusic = document.querySelector(".modal-music"),
    musicClose = document.querySelector(".music-close"),
    musicHide = document.querySelector(".music-hide"),
    musicBtn = document.querySelector(".music-btn");
let playerMusic = [
    {
        id: 0,
        imgs: "images/alarm.svg",
        title: "test1",
        singer: "singer1",
        src: "music/1.mp3"
    },
    {
        id: 1,
        imgs: "images/change_circle.svg",
        title: "test2",
        singer: "singer2",
        src: "music/2.mp3"
    },
    {
        id: 2,
        imgs: "images/delete.svg",
        title: "test3",
        singer: "singer3",
        src: "music/3.mp3"
    }
]
var n = 0, flag = true; //song key
initInfo(n);

// Click play song and click play again to pause
play.addEventListener("click", startPlay);
// Click to switch to the next song
next.addEventListener("click", theNext);
// Click to switch to the previous song
prev.addEventListener("click", thePrev);

musicBtn.addEventListener("click", () => {
    modalMusic.style.display = "block";
})

musicClose.addEventListener("click", () => {
    n = 0, flag = true;
    initInfo(n);
    play.className = "play1";
    play.title = "play";
    modalMusic.style.display = "none";
})

musicHide.addEventListener("click", () => {
    modalMusic.style.display = "none";
})

// play
function startPlay() {
    if (flag) {
        play.className = "play2";
        play.title = "pause";
        audio.play();
        playProgress();// Playback progress
        playTime();// Playback time
    } else {
        play.className = "play1";
        play.title = "play";
        audio.pause();
    }
    flag = !flag;
}

function initInfo(n) {
    musicImage.src = playerMusic[n].imgs;
    audio.src = playerMusic[n].src;
    names.innerHTML = playerMusic[n].title;
    authors.innerHTML = playerMusic[n].singer;
}

// next
function theNext() {
    n++;
    if (n == playerMusic.length) {
        n = 0;
    }
    initInfo(n);
    flag = true;
    startPlay();
}
// prev
function thePrev() {
    n--;
    if (n < 0) {
        n = playerMusic.length - 1;
    }
    initInfo(n);
    flag = true;
    startPlay();
}

function playProgress() {
    var timer = null;
    if (flag) {
        timer = setInterval(function () {
            if (audio.currentTime >= audio.duration) {
                curProgrees.style.width = progrees.offsetWidth + "px";
                clearInterval(timer);
                theNext();
            } else {
                curProgrees.style.width = (audio.currentTime / audio.duration) * progrees.offsetWidth + "px";
            }
        }, 30);
    } else {
        clearInterval(timer);
    }

}
function playTime() {
    var timer2 = null;
    if (flag) {
        timer2 = setInterval(function () {
            setTime(audio.duration, totalTime);
            setTime(audio.currentTime, presentTime);
        }, 1000)
    } else {
        clearInterval(timer2)
    }
}
function setTime(audioTime, obj) {
    allMinute = Math.floor(audioTime / 60);
    if (allMinute < 10) {
        allMinute = "0" + allMinute;
    }
    allSecond = Math.floor(audioTime % 60);
    if (allSecond < 10) {
        allSecond = "0" + allSecond;
    }
    var allTime = allMinute + " : " + allSecond;
    obj.innerHTML = allTime;
}