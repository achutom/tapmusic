let mediaRecorder;
let audioChunks = [];
const sounds = document.querySelectorAll(".sound");
const pads = document.querySelectorAll(".pads div");

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

  if (key >= 1 && key <= 6) {
    const padIndex = parseInt(key) - 1;

    if (pads[padIndex]) {
      pads[padIndex].click();
    }
  }
});
