let startTime,
  updatedTime,
  difference,
  tInterval,
  running = false,
  paused = false;
const timeDisplay = document.getElementById("time");
const lapContainer = document.getElementById("laps");

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", recordLap);

function startTimer() {
  if (!running) {
    startTime = new Date().getTime() - (paused ? difference : 0);
    tInterval = setInterval(updateTime, 10);
    running = true;
    paused = false;
  }
}

function pauseTimer() {
  if (running) {
    clearInterval(tInterval);
    difference = new Date().getTime() - startTime;
    running = false;
    paused = true;
  }
}

function resetTimer() {
  clearInterval(tInterval);
  running = false;
  paused = false;
  difference = 0;
  timeDisplay.innerHTML = "00:00:00.00";
  lapContainer.innerHTML = "";
}

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let hours = Math.floor(difference / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);
  let milliseconds = Math.floor((difference % 1000) / 10);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;

  timeDisplay.innerHTML = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function recordLap() {
  if (running) {
    const lapTime = document.createElement("div");
    lapTime.textContent = timeDisplay.innerHTML;
    lapContainer.appendChild(lapTime);
  }
}
