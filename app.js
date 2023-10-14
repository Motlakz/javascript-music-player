// Define audio elements
const song1 = document.getElementById("song1");
const song2 = document.getElementById("song2");

// Define buttons for navigation
const nextBtnFirst = document.querySelector(".container.first .next");
const nextBtnSecond = document.querySelector(".container.second .next");
const prevBtnFirst = document.querySelector(".container.first .prev");
const prevBtnSecond = document.querySelector(".container.second .prev");
const playPauseFirst = document.querySelector(".container.first .play-pause");
const playPauseSecond = document.querySelector(".container.second .play-pause");

// Define progress bars
const progressBar = document.getElementById("myProgressBar");
const progressBar2 = document.getElementById("myOtherProgressBar");

// Initialize song state
let currentSong;
let isPlaying = false;
let isPaused = true; // Initialize isPaused to true

// Auto-play the first song on page load
window.addEventListener("load", () => {
  currentSong = song1;
  playPauseFirst.click();
});

// Initialize progress bars to 0% on page load
window.addEventListener("load", () => {
  progressBar.style.width = "0%";
  progressBar2.style.width = "0%";
});

// Function to update play/pause button state
function updatePlayPauseButton(playPauseBtn, isPlaying) {
  if (isPlaying) {
    playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
  } else {
    playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
  }
}

// Function to update progress bar and duration
function updateProgressBar(progressBar, song) {
  const progress = (song.currentTime / song.duration) * 100;
  progressBar.style.width = `${progress}%`;

  // Update the duration elements
  const container = song === song1 ? "first" : "second";
  const durationStartElement = document.querySelector(`.container.${container} .duration-start`);
  const durationEndElement = document.querySelector(`.container.${container} .duration-end`);
  durationStartElement.textContent = formatTime(song.currentTime);
  durationEndElement.textContent = formatTime(song.duration - song.currentTime);
}


// Format time in MM:SS
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Play/Pause button click event for the first container
playPauseFirst.addEventListener("click", () => {
  if (currentSong === song1) {
    if (isPaused) { // Play when paused
      song1.play();
      isPlaying = true;
      isPaused = false;
    } else { // Pause when playing
      song1.pause();
      isPlaying = false;
      isPaused = true;
    }
    updatePlayPauseButton(playPauseFirst, isPlaying);
  }
});

// Play/Pause button click event for the second container
playPauseSecond.addEventListener("click", () => {
  if (currentSong === song2) {
    if (isPaused) { // Play when paused
      song2.play();
      isPlaying = true;
      isPaused = false;
    } else { // Pause when playing
      song2.pause();
      isPlaying = false;
      isPaused = true;
    }
    updatePlayPauseButton(playPauseSecond, isPlaying);
  }
});

// Next button click event for the first container
nextBtnFirst.addEventListener("click", () => {
  currentSong = song2;
  progressBar.style.width = "0%";
  song1.pause();
  isPlaying = false;
  isPaused = true;
  updatePlayPauseButton(playPauseFirst, isPlaying);
  updatePlayPauseButton(playPauseSecond, isPlaying);
  song2.play();
  isPlaying = true;
  isPaused = false;
  updatePlayPauseButton(playPauseSecond, isPlaying);
  const firstContainer = document.querySelector(".container.first");
  const secondContainer = document.querySelector(".container.second");
  firstContainer.style.display = "none";
  secondContainer.style.display = "block";
  updateProgressBar(progressBar2, song2);
});

// Next button click event for the second container
nextBtnSecond.addEventListener("click", () => {
  currentSong = song1;
  progressBar2.style.width = "0%";
  song2.pause();
  isPlaying = false;
  isPaused = true;
  updatePlayPauseButton(playPauseSecond, isPlaying);
  updatePlayPauseButton(playPauseFirst, isPlaying);
  song1.play();
  isPlaying = true;
  isPaused = false;
  updatePlayPauseButton(playPauseFirst, isPlaying);
  const firstContainer = document.querySelector(".container.first");
  const secondContainer = document.querySelector(".container.second");
  firstContainer.style.display = "block";
  secondContainer.style.display = "none";
  updateProgressBar(progressBar, song1);
});

// Previous button click event for the first container
prevBtnFirst.addEventListener("click", () => {
  currentSong = song2;
  progressBar.style.width = "0%";
  song1.pause();
  isPlaying = false;
  isPaused = true;
  updatePlayPauseButton(playPauseFirst, isPlaying);
  updatePlayPauseButton(playPauseSecond, isPlaying);
  song2.play();
  isPlaying = true;
  isPaused = false;
  updatePlayPauseButton(playPauseSecond, isPlaying);
  const firstContainer = document.querySelector(".container.first");
  const secondContainer = document.querySelector(".container.second");
  firstContainer.style.display = "none";
  secondContainer.style.display = "block";
  updateProgressBar(progressBar2, song2);
});

// Previous button click event for the second container
prevBtnSecond.addEventListener("click", () => {
  currentSong = song1;
  progressBar2.style.width = "0%";
  song2.pause();
  isPlaying = false;
  isPaused = true;
  updatePlayPauseButton(playPauseSecond, isPlaying);
  updatePlayPauseButton(playPauseFirst, isPlaying);
  song1.play();
  isPlaying = true;
  isPaused = false;
  updatePlayPauseButton(playPauseFirst, isPlaying);
  const firstContainer = document.querySelector(".container.first");
  const secondContainer = document.querySelector(".container.second");
  firstContainer.style.display = "block";
  secondContainer.style.display = "none";
  updateProgressBar(progressBar, song1);
});

// Update progress bars as the songs play
song1.addEventListener("timeupdate", () => {
  if (currentSong === song1) {
    updateProgressBar(progressBar, song1);
  }
});

song2.addEventListener("timeupdate", () => {
  if (currentSong === song2) {
    updateProgressBar(progressBar2, song2);
  }
});
