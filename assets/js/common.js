// =========================================================
// COMMON HELPERS (used across pages)
// =========================================================

export function $(sel, root = document) {
  return root.querySelector(sel);
}
export function $all(sel, root = document) {
  return [...root.querySelectorAll(sel)];
}

// 24h "HH:MM Wed Nov 15" formatting
export function formatTabletDateTime(date = new Date()) {
  const time = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(date);

  const parts = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "2-digit"
  }).formatToParts(date);

  // Ensures "Wed Nov 15" order even if locale differs
  const weekday = parts.find(p => p.type === "weekday")?.value ?? "Wed";
  const month = parts.find(p => p.type === "month")?.value ?? "Nov";
  const day = parts.find(p => p.type === "day")?.value ?? "15";

  return `${time} ${weekday} ${month} ${day}`;
}

export function mountStatusBarClock(el) {
  const tick = () => { el.textContent = formatTabletDateTime(new Date()); };
  tick();
  setInterval(tick, 1000 * 30);
}

// Inline SVG icons (so you don’t need an icon library)
export function wifiSVG() {
  return `
  <svg class="status-icon" viewBox="0 0 24 24" fill="none">
    <path d="M2.5 8.8C8.6 3.7 15.4 3.7 21.5 8.8" stroke="white" opacity="0.9" stroke-width="2" stroke-linecap="round"/>
    <path d="M5.8 12.2C10 8.7 14 8.7 18.2 12.2" stroke="white" opacity="0.9" stroke-width="2" stroke-linecap="round"/>
    <path d="M9.2 15.7C11 14.3 13 14.3 14.8 15.7" stroke="white" opacity="0.9" stroke-width="2" stroke-linecap="round"/>
    <circle cx="12" cy="18.6" r="1.3" fill="white" opacity="0.9"/>
  </svg>`;
}

export function batterySVG() {
  return `
  <svg class="status-icon" viewBox="0 0 28 24" fill="none">
    <rect x="2" y="7" width="20" height="10" rx="2" stroke="white" opacity="0.9" stroke-width="2"/>
    <rect x="4.2" y="9.2" width="12" height="5.6" rx="1.2" fill="white" opacity="0.9"/>
    <rect x="23" y="10" width="3" height="4" rx="1" fill="white" opacity="0.9"/>
  </svg>`;
}


export function lockSVG() {
  // IMPORTANT: the shackle path has id="lockShackle" so CSS can animate it.
  return `
  <svg class="lock-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <!-- Shackle -->
    <path id="lockShackle"
      d="M8 10V7.8C8 5.7 9.8 4 12 4s4 1.7 4 3.8V10"
      stroke="white" opacity="0.95" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>

    <!-- Body -->
    <path
      d="M7 10h10a2 2 0 0 1 2 2v6.5A2.5 2.5 0 0 1 16.5 21h-9A2.5 2.5 0 0 1 5 18.5V12a2 2 0 0 1 2-2Z"
      stroke="white" opacity="0.95" stroke-width="2" stroke-linejoin="round"/>

    <!-- Keyhole -->
    <path d="M12 14.2v2.6" stroke="white" opacity="0.95" stroke-width="2" stroke-linecap="round"/>
  </svg>`;
}
