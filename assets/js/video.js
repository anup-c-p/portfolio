import { $, mountStatusBarClock, wifiSVG, batterySVG } from "./common.js";

mountStatusBarClock($("#clockText"));
$("#statusIcons").innerHTML = wifiSVG() + batterySVG();

// EDIT HERE: Replace url/title with your own videos.
const videos = [
  { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "Video 1" },
  { url: "https://www.youtube.com/watch?v=ysz5S6PUM-U", title: "Video 2" },
  { url: "https://www.youtube.com/watch?v=jNQXAC9IVRw", title: "Video 3" }
];

function toEmbed(url) {
  const u = new URL(url);
  if (u.hostname.includes("youtu.be")) {
    return `https://www.youtube.com/embed/${u.pathname.replace("/", "")}`;
  }
  const id = u.searchParams.get("v");
  return `https://www.youtube.com/embed/${id}`;
}

const row = $("#videoRow");

function setIframeSrc(card, src) {
  const iframe = card.querySelector("iframe");
  if (!iframe) return;
  if (iframe.src !== src) iframe.src = src;
}

function setActive(index) {
  const cards = [...row.querySelectorAll(".video-card")];

  cards.forEach((card, i) => {
    const willBeActive = i === index;
    const embed = card.dataset.embed;

    card.classList.toggle("active", willBeActive);

    if (willBeActive) {
      // Active: load the video
      setIframeSrc(card, embed);
    } else {
      // Inactive: stop playback + prevent interaction
      setIframeSrc(card, "about:blank");
    }
  });
}

function render() {
  row.innerHTML = videos
    .map((v, i) => {
      const embed = toEmbed(v.url);
      const src = i === 0 ? embed : "about:blank"; // only load first on initial page load

      return `
        <div class="video-card ${i === 0 ? "active" : ""}" data-index="${i}" data-embed="${embed}">
          <div class="video-frame">
            <div class="video-overlay" aria-label="Select video"></div>
            <iframe
              class="video-embed"
              src="${src}"
              loading="lazy"
              title="${v.title}"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div class="video-title">${v.title}</div>
        </div>
      `;
    })
    .join("");

  // Default active: first
  setActive(0);

  // Click anywhere on a card. If it is not active, activate it.
  row.addEventListener("click", (e) => {
    const card = e.target.closest(".video-card");
    if (!card) return;

    if (card.classList.contains("active")) return; // let the user interact with the active iframe

    const idx = Number(card.dataset.index);
    setActive(idx);
  });
}

render();
