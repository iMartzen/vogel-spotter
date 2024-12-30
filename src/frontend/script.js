// Translations
const translations = {
  nl: {
    refreshButton: "🔄 Verversen",
    statusIndicatorFetching: "Status ophalen...",
    statusOnline: "🟢 Online",
    statusOffline: "🔴 Offline",
    localeToggleButton: "🇬🇧 English",
    themeToggleButtonDark: "🌙 Donkere modus",
    themeToggleButtonLight: "☀️ Lichte modus",
    h1: "Vogels waargenomen in mijn tuin",
    h2: "Recente waarnemingen van het afgelopen uur",
    footerLeft: "Project op GitHub",
    footerRight: "Met ♥︎ gemaakt door",
    noDetections: "Geen waarnemingen in het afgelopen uur",
    unknownBird: "Onbekende vogel",
    unknownTime: "Onbekend",
    errorMessageStatus: "Kon de status niet laden.",
    lastHeardAt: "Laatst gehoord om:",
    collapsibleTextShow: "Klik om meer tijden te zien",
    collapsibleTextHide: "Klik om minder tijden te zien",
  },
  en: {
    refreshButton: "🔄 Refresh",
    statusIndicatorFetching: "Fetching status...",
    statusOnline: "🟢 Online",
    statusOffline: "🔴 Offline",
    localeToggleButton: "🇳🇱 Nederlands",
    themeToggleButtonDark: "🌙 Dark Mode",
    themeToggleButtonLight: "☀️ Light Mode",
    h1: "Birds spotted in my garden",
    h2: "Recent sightings from the past hour",
    footerLeft: "Project on GitHub",
    footerRight: "Made with ♥︎ by",
    noDetections: "No sightings in the past hour",
    unknownBird: "Unknown bird",
    unknownTime: "Unknown",
    errorMessageStatus: "Could not load the status.",
    lastHeardAt: "Last heard at:",
    collapsibleTextShow: "Click to see more times",
    collapsibleTextHide: "Click to see fewer times",
  },
};

function getCurrentLocale() {
  return document.documentElement.getAttribute("locale") || "nl";
}

function setCurrentLocale(locale) {
  document.documentElement.setAttribute("locale", locale);
}

function updateLocale() {
  const locale = getCurrentLocale();
  const t = translations[locale];
  if (!t) return;

  // Buttons
  document.getElementById("refresh-button").textContent = t.refreshButton;
  const statusIndicator = document.getElementById("status-indicator");
  statusIndicator.textContent = t.statusIndicatorFetching;

  document.getElementById("locale-toggle-button").textContent =
    t.localeToggleButton;

  // Theme
  const currentTheme = document.documentElement.getAttribute("data-theme");
  document.getElementById("theme-toggle-button").textContent =
    currentTheme === "dark"
      ? t.themeToggleButtonLight
      : t.themeToggleButtonDark;

  // Title
  document.querySelector(".birds h1").textContent = t.h1;
  document.querySelector(".birds h2").textContent = t.h2;

  // Footer
  document.querySelector(".footer-left a").textContent = t.footerLeft;
  document.querySelector(
    ".footer-right p"
  ).innerHTML = `${t.footerRight} <a href="https://github.com/iMartzen">iMartzen</a>`;
}

async function fetchBirds() {
  try {
    const locale = getCurrentLocale();
    const t = translations[locale];
    const response = await fetch(`/api/detections?locale=${locale}`);
    const data = await response.json();
    const birdList = document.getElementById("bird-list");
    birdList.innerHTML = "";

    if (!data.detections || data.detections.length === 0) {
      const noBirds = document.createElement("li");
      noBirds.className = "bird-card";
      const noBirdsText = document.createElement("p");
      noBirdsText.textContent = t.noDetections;
      noBirds.appendChild(noBirdsText);
      birdList.appendChild(noBirds);
      return;
    }

    const groupedDetections = data.detections.reduce((acc, detection) => {
      const commonName = detection.commonName || t.unknownBird;
      if (!acc[commonName]) {
        acc[commonName] = [];
      }
      acc[commonName].push(detection);
      return acc;
    }, {});

    Object.keys(groupedDetections).forEach((commonName) => {
      const birdCard = document.createElement("li");
      birdCard.className = "bird-card";

      // Bird Image
      const birdImage = document.createElement("img");
      birdImage.src =
        groupedDetections[commonName][0].thumbnailUrl || "fallback-image.jpg";
      birdImage.alt =
        groupedDetections[commonName][0].commonName || t.unknownBird;
      birdImage.className = "bird-thumbnail";

      // Bird Info
      const birdInfo = document.createElement("div");
      birdInfo.className = "bird-info";

      const birdInfoHeader = document.createElement("div");
      birdInfoHeader.className = "bird-info-header";

      const birdTitle = document.createElement("h3");
      birdTitle.textContent =
        groupedDetections[commonName][0].commonName || t.unknownBird;

      const birdTime = document.createElement("p");
      birdTime.className = "bird-time";
      birdTime.textContent = `${t.lastHeardAt} ${
        groupedDetections[commonName][0].time || t.unknownTime
      }`;

      // Collapsible section
      const collapsibleSection = document.createElement("div");
      collapsibleSection.className = "collapsible-section";
      collapsibleSection.style.display = "none";

      groupedDetections[commonName].forEach((detection, index) => {
        if (index > 0) {
          const detectionInfo = document.createElement("div");
          detectionInfo.className = "detection-info";

          const detectionTime = document.createElement("p");
          detectionTime.textContent = `${detection.time || t.unknownTime}`;

          detectionInfo.appendChild(detectionTime);
          collapsibleSection.appendChild(detectionInfo);
        }
      });

      // Collapsible text
      const collapsibleText = document.createElement("span");
      collapsibleText.className = "collapsible-text";
      collapsibleText.textContent = t.collapsibleTextShow;

      birdCard.addEventListener("click", () => {
        const isCollapsed = collapsibleSection.style.display === "none";
        collapsibleSection.style.display = isCollapsed ? "block" : "none";

        // Adjust max-height for smooth interaction
        collapsibleSection.style.maxHeight = isCollapsed ? "200px" : "0px";
        collapsibleText.textContent = isCollapsed
          ? t.collapsibleTextHide
          : t.collapsibleTextShow;
      });

      // Merge
      birdInfoHeader.appendChild(birdTitle);
      birdInfoHeader.appendChild(birdTime);
      birdInfoHeader.appendChild(collapsibleText);
      birdInfo.appendChild(birdInfoHeader);
      birdCard.appendChild(birdImage);
      birdCard.appendChild(birdInfo);
      birdCard.appendChild(collapsibleSection);
      birdList.appendChild(birdCard);
    });
  } catch (error) {
    console.error(translations[getCurrentLocale()].errorMessageStatus, error);
  }
}

async function fetchStatus() {
  try {
    const locale = getCurrentLocale();
    const t = translations[locale];
    const statusIndicator = document.getElementById("status-indicator");

    const response = await fetch("/api/status");
    const data = await response.json();

    if (data.status) {
      // Online
      statusIndicator.innerHTML = t.statusOnline;
      statusIndicator.className = "status-indicator status-online";
    } else {
      // Offline
      statusIndicator.innerHTML = t.statusOffline;
      statusIndicator.className = "status-indicator status-offline";
    }
  } catch (error) {
    console.error(t.errorMessageStatus, error);
  }
}

function refreshAll() {
  fetchBirds();
  fetchStatus();
  updateLocale();
}

document.addEventListener("DOMContentLoaded", () => {
  if (!document.documentElement.getAttribute("locale")) {
    setCurrentLocale("nl");
  }

  refreshAll();

  document
    .getElementById("refresh-button")
    .addEventListener("click", refreshAll);

  document
    .getElementById("theme-toggle-button")
    .addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newTheme);
      refreshAll();
      const githubIcon = document.getElementById("github-icon");
      if (githubIcon) {
        githubIcon.src =
          newTheme === "dark"
            ? "images/github-icon-white.svg"
            : "images/github-icon.svg";
      }
    });

  document
    .getElementById("locale-toggle-button")
    .addEventListener("click", () => {
      const currentLocale = getCurrentLocale();
      const newLocale = currentLocale === "nl" ? "en" : "nl";
      setCurrentLocale(newLocale);
      refreshAll();
    });

  setInterval(fetchBirds, 600000);
  setInterval(fetchStatus, 60000);
});
