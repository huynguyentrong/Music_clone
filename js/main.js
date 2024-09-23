const menuOpen = document.getElementById("menu-open");
const menuClose = document.getElementById("menu-close");
const sidebar = document.querySelector(".sidebar");
menuOpen.addEventListener("click", () => {
  sidebar.style.left = "0";
});
menuClose.addEventListener("click", () => {
  sidebar.style.left = "-100%";
});
const song = document.getElementById("song");
const playBtn = document.querySelector(".play-btn");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-backward");
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeBtn = document.getElementById("range");
const musicImg = document.querySelector(".music-thumb");
const musicName = document.querySelector(".music-name");
const playRepeat = document.querySelector(".play-repeat");
const Random = document.querySelector(".play-infinity");
const musicList = document.querySelector(".music-list-playlist");
const searchSong = document.querySelector(".song-search");

const musics = [
  {
    id: 1,
    title: "Holo",
    file: "holo.mp3",
    image:
      "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80",
  },
  {
    id: 2,
    title: "Summer",
    file: "summer.mp3",
    image:
      "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 3,
    title: "Spark",
    file: "spark.mp3",
    image:
      "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 4,
    title: "Vô tình",
    file: "votinh.mp3",
    image:
      "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 5,
    title: "Thu cuối",
    file: "Thu cuối.mp3",
    image:
      "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 6,
    title: "Người nào đó",
    file: "nguoi nao do.mp3",
    image:
      "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 7,
    title: "Tân cùng của nỗi nhớ",
    file: "tan cung cua noi nho.mp3",
    image:
      "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
];
let timer;
let indexSong = 0;
let isRepeat = false;
let isRandom = false;
let currentDuration = "00:00";
let isPlaying = true;
let repeatCount = 0;
nextBtn.addEventListener("click", () => {
  if (isRandom) {
    playRandomSong();
    changeSong(1);
  } else {
    changeSong(1);
  }
});
prevBtn.addEventListener("click", () => {
  if (isRandom) {
    playRandomSong();
    changeSong(-1);
  } else {
    changeSong(-1);
  }
});
song.addEventListener("ended", handleEndedSong);
function handleEndedSong() {
  repeatCount++;
  if (isRepeat && repeatCount === 1) {
    // handle repeat song
    isPlaying = true;
    playPause();
  } else {
    changeSong(1);
  }
}
function changeSong(dir) {
  if (dir === 1) {
    // next song
    indexSong++;
    if (indexSong >= musics.length) {
      indexSong = 0;
    }
    isPlaying = true;
  } else if (dir === -1) {
    // prev song
    indexSong--;
    if (indexSong < 0) {
      indexSong = musics.length - 1;
    }
    isPlaying = true;
  }
  init(indexSong);
  playPause();
}
playBtn.addEventListener("click", playPause);
function playPause() {
  if (isPlaying) {
    song.play();
    isPlaying = false;
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    timer = setInterval(displayTime, 500);
  } else {
    song.pause();
    isPlaying = true;
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    clearInterval(timer);
  }
}
function displayTime() {
  const { duration, currentTime } = song;
  rangeBtn.max = duration;
  rangeBtn.value = currentTime;
  remainingTime.textContent = formatTimer(currentTime);
  if (!duration) {
    durationTime.textContent = "00:00";
  } else {
    durationTime.textContent = formatTimer(duration);
  }
}

function formatTimer(number) {
  const minutes = Math.floor(number / 60);
  const seconds = Math.floor(number - minutes * 60);
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}
rangeBtn.addEventListener("change", handleChangeBar);
function handleChangeBar() {
  song.currentTime = rangeBtn.value;
}
playRepeat.addEventListener("click", () => {
  if (isRepeat) {
    isRepeat = false;
    playRepeat.removeAttribute("style");
  } else {
    isRepeat = true;
    playRepeat.style.color = "#ffb86c";
  }
});

// Ramdom Song
Random.addEventListener("click", () => {
  if (isRandom) {
    isRandom = false;
    Random.removeAttribute("style");
  } else {
    isRandom = true;
    Random.style.color = "#ffb86c";
  }
});
function playRandomSong() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * musics.length);
  } while (newIndex === indexSong);
  indexSong = newIndex;
}
song.addEventListener("loadedmetadata", () => {
  currentDuration = formatTimer(song.duration);
  render(musics);
});
searchSong.addEventListener("input", searchListSong);
function searchListSong() {
  let value = searchSong.value;
  let songFilter = musics.filter((song) => {
    return song.title.toUpperCase().includes(value.toUpperCase());
  });
  render(songFilter);
}
function render(musics) {
  const htmls = musics.map((music, index) => {
    const duration = index === indexSong ? currentDuration : "00:00";
    return `
    <div class="music-list-items">
              <div class="music-list-item">
                <div class="music-list-item-info">
                  <p>${music.id}</p>
                  <img src="${music.image}" alt="" />
                  <div class="music-list-item-details">
                    <h5>${music.title}</h5>
                    <p>Lila Rivera</p>
                  </div>
                </div>
                <div class="music-list-item-action">
                  <p>${duration}</p>
                  <div class="icon">
                    <i class="fa-solid fa-play"></i>
                  </div>
                  <i class="fa-solid fa-plus"></i>
                </div>
                </div>
    `;
  });
  musicList.innerHTML = htmls.join("");
}
function init(indexSong) {
  song.setAttribute("src", `./music/${musics[indexSong].file}`);
  musicImg.setAttribute("src", musics[indexSong].image);
  musicName.textContent = musics[indexSong].title;
  currentDuration = "00:00";
}
// searchListSong();
displayTime();
init(indexSong);
