import { $, mountStatusBarClock, wifiSVG, batterySVG } from "./common.js";
import { renderDock } from "./commonDock.js";

mountStatusBarClock($("#clockText"));
$("#statusIcons").innerHTML = wifiSVG() + batterySVG();

// =====================================================
// EDIT HERE: Place your images in assets/img/hardware/
// and update captions below.
// Recommended: 1600px wide images for crisp display.
// =====================================================
const items = [
  { img: "assets/img/hardware/hw1.jpg", caption: "Project 1 caption (edit here)" },
  { img: "assets/img/hardware/hw2.jpg", caption: "Project 2 caption (edit here)" },
  { img: "assets/img/hardware/hw3.jpg", caption: "Project 3 caption (edit here)" },
  { img: "assets/img/hardware/hw4.jpg", caption: "Project 4 caption (edit here)" },
  { img: "assets/img/hardware/hw5.jpg", caption: "Project 5 caption (edit here)" },
  { img: "assets/img/hardware/hw6.jpg", caption: "Project 6 caption (edit here)" },
];

let start = 0; // index of first visible item
const track = $("#track");

function render() {
  const visible = [];
  for (let i = 0; i < 3; i++) {
    visible.push(items[(start + i) % items.length]);
  }

  track.innerHTML = visible.map(v => `
    <div class="hw-card">
      <img class="hw-img" src="${v.img}" alt="Hardware project image" />
      <div class="hw-caption">${v.caption}</div>
    </div>
  `).join("");
}

$("#prevBtn").addEventListener("click", () => {
  start = (start - 1 + items.length) % items.length;
  render();
});

$("#nextBtn").addEventListener("click", () => {
  start = (start + 1) % items.length;
  render();
});

render();
renderDock($("#dock"), "hardware");
