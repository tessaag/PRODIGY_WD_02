let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

function formatTime(time) {
  let hours = Math.floor(time / 3600000);
  let minutes = Math.floor((time % 3600000) / 60000);
  let seconds = Math.floor((time % 60000) / 1000);
  let milliseconds = Math.floor(time % 1000);

  return (
    pad(hours) + ":" + pad(minutes) + ":" + pad(seconds) + "." + pad(milliseconds, 3)
  );
}

function pad(num, size = 2) {
  return ("0" + num).slice(-size);
}

function start() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timer = setInterval(function () {
      elapsedTime = Date.now() - startTime;
      document.querySelector(".display").innerHTML = formatTime(elapsedTime);
    }, 10);
  }
}

function pause() {
  clearInterval(timer);
  isRunning = false;
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  document.querySelector(".display").innerHTML = formatTime(elapsedTime);
  laps = [];
  updateLaps();
}

function lap() {
  if (isRunning) {
    let lapTime = elapsedTime;
    let previousLapTime = laps.length > 0 ? laps[laps.length - 1] : 0;
    let lapElapsedTime = lapTime - previousLapTime;
    laps.push(lapTime);
    updateLaps();
  }
}

function updateLaps() {
  let lapList = document.getElementById("lapList");
  lapList.innerHTML = "";
  laps.forEach(function (lap, index) {
    let lapItem = document.createElement("li");
    lapItem.textContent = "Lap " + (index + 1) + ": " + formatTime(lap);
    lapList.appendChild(lapItem);
  });
}

document.getElementById("startButton").addEventListener("click", start);
document.getElementById("pauseButton").addEventListener("click", pause);
document.getElementById("resetButton").addEventListener("click", reset);
document.getElementById("lapButton").addEventListener("click", lap);
