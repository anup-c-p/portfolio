export function renderDock(dockEl, activeKey) {
  const icons = {
    home: "assets/img/icons/app-home.png",
    video: "assets/img/icons/app-video.png",
    programming: "assets/img/icons/app-programming.png",
    hardware: "assets/img/icons/app-hardware.png",
    startups: "assets/img/icons/app-startups.png",
  };

  const homeSVG = `
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 10.6 12 4l8 6.6V20a1.6 1.6 0 0 1-1.6 1.6H5.6A1.6 1.6 0 0 1 4 20v-9.4Z"
        stroke="white" opacity="0.92" stroke-width="2" stroke-linejoin="round"/>
      <path d="M9.5 21v-7h5v7" stroke="white" opacity="0.92" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;

  dockEl.innerHTML = `
    <div class="dock-left">
      <a class="dock-btn ${activeKey === "home" ? "active" : ""}" href="main.html" aria-label="Main">
        ${icons.home ? `<img src="${icons.home}" alt="Home">` : homeSVG}
        <div class="dock-label">Main</div>
      </a>
    </div>

    <div class="dock-right">
      <a class="dock-btn ${activeKey === "video" ? "active" : ""}" href="video.html" aria-label="Video Editing">
        <img src="${icons.video}" alt="Video Editing">
        <div class="dock-label">Video</div>
      </a>

      <a class="dock-btn ${activeKey === "programming" ? "active" : ""}" href="programming.html" aria-label="Programming">
        <img src="${icons.programming}" alt="Programming">
        <div class="dock-label">Code</div>
      </a>

      <a class="dock-btn ${activeKey === "hardware" ? "active" : ""}" href="hardware.html" aria-label="Hardware">
        <img src="${icons.hardware}" alt="Hardware">
        <div class="dock-label">Hardware</div>
      </a>

      <a class="dock-btn ${activeKey === "startups" ? "active" : ""}" href="startups.html" aria-label="Startups">
        <img src="${icons.startups}" alt="Startups">
        <div class="dock-label">Startups</div>
      </a>
    </div>
  `;
}
