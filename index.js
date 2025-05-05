let mediaRecorder;
let audioChunks = [];
let metronomeInterval;
const sounds = document.querySelectorAll(".sound");
const pads = document.querySelectorAll(".pads div");
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const startMetronome = document.getElementById("startMetronome");
const stopMetronome = document.getElementById("stopMetronome");
const bpmInput = document.getElementById("bpmInput");

window.addEventListener("load", () => {
  //ADD sound
  pads.forEach((pad, index) => {
    pad.addEventListener("click", function () {
      sounds[index].currentTime = 0;
      sounds[index].play();
    });
  });
});

// Add keyboard shortcuts

window.addEventListener("keydown", (event) => {
  const key = event.key;
  const activeElement = document.activeElement;

  if (activeElement.tagName === "INPUT" && activeElement.id === "bpmInput") {
    return;
  }

  if (key >= 1 && key <= 6) {
    const padIndex = parseInt(key) - 1;

    if (pads[padIndex]) {
      pads[padIndex].click();
    }
  }
});

// Add metronome functions
function playClickSound() {
  const tick = document.getElementById("metronomeBeat");
  tick.currentTime = 0;
  tick.play();
}

startMetronome.addEventListener("click", () => {
  const bpm = parseInt(bpmInput.value, 10);
  const interval = 60000 / bpm; // ms per beat

  if (isNaN(bpm) || bpm <= 0) return alert("Enter a valid BPM");

  playClickSound(); // First tick immediately
  metronomeInterval = setInterval(playClickSound, interval);

  startMetronome.disabled = true;
  stopMetronome.disabled = false;
});

stopMetronome.addEventListener("click", () => {
  clearInterval(metronomeInterval);

  startMetronome.disabled = false;
  stopMetronome.disabled = true;
});
