import { $, mountStatusBarClock, wifiSVG, batterySVG } from "./common.js";
import { renderDock } from "./commonDock.js";

mountStatusBarClock($("#clockText"));
$("#statusIcons").innerHTML = wifiSVG() + batterySVG();

// =====================================================
// EDIT HERE: YouTube URLs
// =====================================================
const videos = [
  { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { url: "https://www.youtube.com/watch?v=ysz5S6PUM-U" },
  { url: "https://www.youtube.com/watch?v=jNQXAC9IVRw" },
];

function toEmbed(url) {
  const u = new URL(url);
  if (u.hostname.includes("youtu.be")) {
    return `https://www.youtube.com/embed/${u.pathname.replace("/", "")}`;
  }
  const id = u.searchParams.get("v");
  return `https://www.youtube.com/embed/${id}`;
}

// Title via oEmbed (no key)
async function fetchTitle(url) {
  try {
    const oembed = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    const res = await fetch(oembed);
    if (!res.ok) throw new Error("oEmbed failed");
    const data = await res.json();
    return data.title || "Untitled";
  } catch {
    return "Video Title (edit manually if needed)";
  }
}

const row = $("#videoRow");

// --- Stops playback reliably by resetting iframe src
function stopVideo(card) {
  const iframe = card.querySelector("iframe");
  const embed = card.dataset.embed;
  iframe.src = embed; // reset to stop playback
}

// --- Activate one card, deactivate others (and stop them)
function setActive(index) {
  const cards = [...row.querySelectorAll(".video-card")];

  cards.forEach((c, i) => {
    const isCurrentlyActive = c.classList.contains("active");
    const willBeActive = i === index;

    // If we're turning a card OFF, stop it
    if (isCurrentlyActive && !willBeActive) {
      stopVideo(c);
    }

    c.classList.toggle("active", willBeActive);
  });
}

(async function render() {
  const titled = await Promise.all(
    videos.map(async (v) => ({ ...v, title: await fetchTitle(v.url) }))
  );

  row.innerHTML = titled.map((v, i) => {
    const embed = toEmbed(v.url);
    return `
      <div class="video-card ${i === 0 ? "active" : ""}" data-index="${i}" data-embed="${embed}">
        <!-- IMPORTANT:
             This overlay exists so when NOT highlighted, clicking ANYWHERE (including video area)
             highlights it, and the iframe cannot be interacted with. -->
        <div class="video-overlay" aria-label="Select video"></div>

        <iframe class="video-embed"
          src="${embed}"
          title="${v.title}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>

        <div class="video-title">${v.title}</div>
      </div>
    `;
  }).join("");

  // Default active: first
  setActive(0);

  // Click anywhere on a card (including where the video is when not highlighted)
  row.addEventListener("click", (e) => {
    const card = e.target.closest(".video-card");
    if (!card) return;

    const idx = Number(card.dataset.index);

    // If you click a NON-active card -> activate it
    if (!card.classList.contains("active")) {
      setActive(idx);
    }
    // If active, do nothing (let the user interact with the video)
  });
})();

renderDock($("#dock"), "video");
