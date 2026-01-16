const btn = document.getElementById("lockBtn");
const device = document.querySelector(".device");

let unlocking = false;

btn.addEventListener("click", () => {
  if (unlocking) return;
  unlocking = true;

  device.classList.add("unlocking");

  // Slower, so you SEE the lift + ripple + open
  setTimeout(() => {
    window.location.href = "main.html";
  }, 1850);
});
