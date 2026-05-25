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
  // Play sounds on click

  pads.forEach((pad, index) => {
    pad.addEventListener("click", function () {
      sounds[index].currentTime = 0;
      sounds[index].play();

      // Active animation effect

      pad.style.transform = "scale(1.1)";
      pad.style.opacity = "0.85";

      setTimeout(() => {
        pad.style.transform = "scale(1)";
        pad.style.opacity = "1";
      }, 150);
    });
  });
});

// Keyboard shortcuts

window.addEventListener("keydown", (event) => {
  const key = event.key;
  const activeElement = document.activeElement;

  // Prevent keyboard trigger while typing BPM

  if (activeElement.tagName === "INPUT" && activeElement.id === "bpmInput") {
    return;
  }

  // Trigger pads using keys 1-6

  if (key >= 1 && key <= 6) {
    const padIndex = parseInt(key) - 1;

    if (pads[padIndex]) {
      pads[padIndex].click();

      // Keyboard feedback animation

      pads[padIndex].style.transform = "scale(1.1)";
      pads[padIndex].style.opacity = "0.85";

      setTimeout(() => {
        pads[padIndex].style.transform = "scale(1)";
        pads[padIndex].style.opacity = "1";
      }, 150);
    }
  }
});

// Metronome sound

function playClickSound() {
  const tick = document.getElementById("metronomeBeat");

  tick.currentTime = 0;
  tick.play();
}

// Start metronome

startMetronome.addEventListener("click", () => {
  const bpm = parseInt(bpmInput.value, 10);

  // Milliseconds per beat

  const interval = 60000 / bpm;

  if (isNaN(bpm) || bpm <= 0) {
    alert("Enter a valid BPM");
    return;
  }

  playClickSound();

  metronomeInterval = setInterval(playClickSound, interval);

  startMetronome.disabled = true;
  stopMetronome.disabled = false;
});

// Stop metronome

stopMetronome.addEventListener("click", () => {
  clearInterval(metronomeInterval);

  startMetronome.disabled = false;
  stopMetronome.disabled = true;
});
