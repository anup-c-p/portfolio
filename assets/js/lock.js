import { $, lockSVG } from "./common.js";

const device = $("#lockRoot");
const btn = $("#lockBtn");

// Inline SVG (no extra requests)
btn.innerHTML = lockSVG();

let unlocking = false;

btn.addEventListener("click", () => {
  if (unlocking) return;
  unlocking = true;

  device.classList.add("unlocking");

  // Matches the slower shackle + glass ripple animation in CSS
  setTimeout(() => {
    window.location.href = "main.html";
  }, 1850);
});
