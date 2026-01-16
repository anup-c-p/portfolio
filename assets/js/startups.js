import { $, $all, mountStatusBarClock, wifiSVG, batterySVG } from "./common.js";

mountStatusBarClock($("#clockText"));
$("#statusIcons").innerHTML = wifiSVG() + batterySVG();

const tabs = $all(".tab");
const pages = {
  tab1: $("#tab1"),
  tab2: $("#tab2"),
};
const urlbar = $("#urlbar");

// =====================================================
// EDIT HERE: URLs shown in the fake browser
// =====================================================
const urls = {
  tab1: "https://anup.local/startups/rester",
  tab2: "https://anup.local/startups/regenly",
};

tabs.forEach(t => {
  t.addEventListener("click", () => {
    const key = t.dataset.tab;

    tabs.forEach(x => x.classList.remove("active"));
    t.classList.add("active");

    Object.values(pages).forEach(p => p.classList.remove("active"));
    pages[key].classList.add("active");

    urlbar.textContent = urls[key];
  });
});

