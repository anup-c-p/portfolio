import { $, mountStatusBarClock, wifiSVG, batterySVG } from "./common.js";
import { renderDock } from "./commonDock.js";

mountStatusBarClock($("#clockText"));
$("#statusIcons").innerHTML = wifiSVG() + batterySVG();

// =====================================================
// EDIT HERE: File system data
// - date: display date string
// - size: display size string
// - content: viewer panel text / links
// =====================================================
const fileSystem = [
  {
    language: "Python",
    files: [
      {
        name: "regenly_analyzer.py",
        date: "2025-11-02", // EDIT HERE
        size: "48 KB",      // EDIT HERE
        content: {
          title: "Regen.ly — Portfolio Analyzer",
          desc: "Data analytics pipeline in Python: ingestion, feature building, backtesting, and visualization.",
          bullets: [
            "Highlights: pandas pipelines, reproducible experiments, metrics dashboards.",
            "Tech: Python, pandas, NumPy, matplotlib, APIs."
          ],
          linkText: "GitHub (add link)",
          linkUrl: "#"
        }
      },
      {
        name: "disease_simulation.ipynb",
        date: "2025-06-06",
        size: "2.1 MB",
        content: {
          title: "Infectious Disease Graph Simulation",
          desc: "Simulation on random graphs with vaccination thresholds and spread dynamics.",
          bullets: [
            "Models: Erdős–Rényi and Barabási–Albert graphs",
            "Focus: thresholds, interventions, and visualization"
          ],
          linkText: "Project writeup (add link)",
          linkUrl: "#"
        }
      }
    ]
  },
  {
    language: "C / C++",
    files: [
      {
        name: "embedded_driver_demo.c",
        date: "2025-10-14",
        size: "12 KB",
        content: {
          title: "Embedded Driver Demo",
          desc: "Low-level I/O and state machine patterns suitable for microcontrollers.",
          bullets: ["Interrupt-safe design notes", "Modular driver structure"],
          linkText: "Docs (add link)",
          linkUrl: "#"
        }
      }
    ]
  },
  {
    language: "JavaScript",
    files: [
      {
        name: "portfolio_tablet_ui.js",
        date: "2026-01-15",
        size: "9 KB",
        content: {
          title: "Tablet UI Portfolio",
          desc: "Interactive iPad-inspired UI with lock screen and apps navigation.",
          bullets: ["Liquid glass components", "Modular pages + shared dock"],
          linkText: "Live demo (add link)",
          linkUrl: "#"
        }
      }
    ]
  }
];

const fsRoot = $("#fs");
const viewer = $("#viewer");

function renderFS() {
  fsRoot.innerHTML = fileSystem.map((group, gi) => `
    <div class="fs-group">
      <div class="fs-lang">📁 ${group.language}</div>
      ${group.files.map((f, fi) => `
        <div class="fs-file" data-gi="${gi}" data-fi="${fi}">
          <div style="font-weight:650;">${f.name}</div>
          <div class="fs-meta">${f.date}</div>
          <div class="fs-meta">${f.size}</div>
        </div>
      `).join("")}
    </div>
  `).join("");
}

function renderViewer(file) {
  const { title, desc, bullets, linkText, linkUrl } = file.content;
  viewer.innerHTML = `
    <h2>${title}</h2>
    <p>${desc}</p>
    <ul>
      ${bullets.map(b => `<li>${b}</li>`).join("")}
    </ul>
    <p><a href="${linkUrl}">${linkText}</a></p>
  `;
}

renderFS();

// Click handler
fsRoot.addEventListener("click", (e) => {
  const row = e.target.closest(".fs-file");
  if (!row) return;

  fsRoot.querySelectorAll(".fs-file").forEach(el => el.classList.remove("active"));
  row.classList.add("active");

  const gi = Number(row.dataset.gi);
  const fi = Number(row.dataset.fi);
  const file = fileSystem[gi].files[fi];
  renderViewer(file);
});

renderDock($("#dock"), "programming");
