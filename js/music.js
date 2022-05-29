let n = 0;  //default first song
let playerMusic = [  // set song Array
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

// get page dom
let musicImage = document.querySelector(".musicImage"),
    audio = document.querySelector("#audio"),
    names = document.querySelector(".names"),
    authors = document.querySelector(".authors"),
    next = document.querySelector(".next"),
    prev = document.querySelector(".prev"),
    modalMusic = document.querySelector(".modal-music"),
    musicClose = document.querySelector(".music-close"),
    musicHide = document.querySelector(".music-hide"),
    musicBtn = document.querySelector(".music-btn");

let audioArr = document.querySelectorAll('audio');
let img = document.querySelector('.play-pause');

if (window.location.pathname == "/task.html") {  // Determine whether the event is set only on task page
    document.getElementById("music").addEventListener("click", () => {
        modalMusic.style.display = "block";
    })
}
// music modal click show
musicBtn.addEventListener("click", () => {
    modalMusic.style.display = "block";
})
// music modal click close
musicClose.addEventListener("click", () => {
    n = 0
    initInfo(n);
    img.src = "../images/play.png";
    modalMusic.style.display = "none";
})
// music modal click hide
musicHide.addEventListener("click", () => {
    modalMusic.style.display = "none";
})
// init page info
initInfo();
function initInfo() {
    musicImage.src = playerMusic[n].imgs; //music cover
    audio.src = playerMusic[n].src; //music audio
    names.innerHTML = playerMusic[n].title; //music name
    authors.innerHTML = playerMusic[n].singer; //music writer
}

// Time conversion
const secondsToMS = (seconds) => {
    const mm = (parseInt(seconds / 60) + '').padStart(2, '0');
    const ss = (parseInt(seconds % 60) + '').padStart(2, '0');
    return `${mm}:${ss}`
}

// drag music progress bars
audioArr.forEach((audio) => {
    const duration = document.querySelector('.duration')
    let totalTime = 0
    audio.addEventListener('canplay', function () {
        totalTime = this.duration
        duration.innerText = secondsToMS(totalTime)
    })

    const currentDuration = document.querySelector('.current-time')
    const progressBars = document.querySelector('.progress-bar')
    audio.addEventListener('timeupdate', function () {
        const currentTime = this.currentTime;
        currentDuration.innerText = secondsToMS(currentTime);
        progressBars.style.width = (currentTime / totalTime * 100) + '%';
    })
    audio.addEventListener('ended', function () {
        img.src = '../images/play.png'
    })
})

// next play
next.addEventListener("click", () => {
    n++;
    if (n == playerMusic.length) n = 0;
    initInfo(n);
    audio.pause();
    img.src = '../images/play.png';
})
// prev play
prev.addEventListener("click", () => {
    n--;
    if (n < 0) {
        n = playerMusic.length - 1;
    }
    initInfo(n);
    audio.pause();
    img.src = '../images/play.png';
})

// Tap play / pause audio
img.addEventListener('click', () => {
    const currentAudio = document.querySelector('audio');
    if (!currentAudio.paused) {
        img.src = '../images/play.png'
        currentAudio.pause();
    } else {
        img.src = '../images/zanting.png'
        currentAudio.play();
    }
})

let progressBars, progresss, currentAudio
// 拖动音频
document.addEventListener('mousedown', (e) => {
    if (e.target.className.includes('progress-dragger')) {
        progressBars = e.target.parentNode
        progresss = progressBars.parentNode
        currentAudio = progresss.parentNode.parentNode.querySelector('audio')

        document.addEventListener('mousemove', dragHandler)

        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', dragHandler)
        })
    }
})

const dragHandler = (e) => {
    const progressClinetW = progresss.clientWidth
    const startPos = progresss.getBoundingClientRect().left
    const endPos = progresss.getBoundingClientRect().right
    const pageX = e.pageX

    const width = Math.max(startPos, Math.min(pageX, endPos)) - startPos

    progressBars.style.width = width + 'px'

    const currentTime = width / progressClinetW * currentAudio.duration

    currentAudio.currentTime = currentTime
}