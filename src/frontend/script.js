// Translations
const translations = {
  nl: {
    refreshButton: "🔄 Verversen",
    localeToggleButton: "🇬🇧 English",
    themeToggleButtonDark: "🌙 Donkere modus",
    themeToggleButtonLight: "☀️ Lichte modus",
    h1: "Vogels waargenomen in onze tuin",
    h2: "Recente waarnemingen van het afgelopen uur",
    footerLeft: "Project op GitHub",
    footerRight: "Met ♥︎ gemaakt door",
    noDetections: "🔴  Geen waarnemingen in het afgelopen uur",
    unknownBird: "Onbekende vogel",
    unknownTime: "Onbekend",
    top25Button: "📊 Top 25",
    recentButton: "⏱️ Recent",
    top25Title: "Top 25 meest waargenomen vogels",
  },
  en: {
    refreshButton: "🔄 Refresh",
    localeToggleButton: "🇳🇱 Nederlands",
    themeToggleButtonDark: "🌙 Dark Mode",
    themeToggleButtonLight: "☀️ Light Mode",
    h1: "Birds spotted in our garden",
    h2: "Recent sightings from the past hour",
    footerLeft: "Project on GitHub",
    footerRight: "Made with ♥︎ by",
    noDetections: "🔴  No sightings in the past hour",
    unknownBird: "Unknown bird",
    unknownTime: "Unknown",
    top25Button: "📊 Top 25",
    recentButton: "⏱️ Recent",
    top25Title: "Top 25 most spotted birds",
  },
};

let currentView = "recent";

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

  document.getElementById("locale-toggle-button").textContent =
    t.localeToggleButton;
    
  document.getElementById("view-toggle-button").textContent =
    currentView === "recent" ? t.top25Button : t.recentButton;

  // Theme
  const currentTheme = document.documentElement.getAttribute("data-theme");
  document.getElementById("theme-toggle-button").textContent =
    currentTheme === "dark"
      ? t.themeToggleButtonLight
      : t.themeToggleButtonDark;

  // Title
  document.querySelector(".birds h1").textContent = t.h1;
  document.querySelector(".birds h2").textContent =
    currentView === "recent" ? t.h2 : t.top25Title; 
    
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

async function fetchTop25Birds() {
  try {
    const locale = getCurrentLocale();
    const response = await fetch(`/api/top25?locale=${locale}`);
    const data = await response.json();
    const birdList = document.getElementById("bird-list");
    birdList.innerHTML = "";

    const t = translations[locale];

    if (!data.top25 || data.top25.length === 0) {
      const noBirds = document.createElement("li");
      noBirds.className = "bird-card";
      const noBirdsText = document.createElement("p");
      noBirdsText.textContent = t.noDetections;
      noBirds.appendChild(noBirdsText);
      birdList.appendChild(noBirds);
      return;
    }

    index = 0
    data.top25.forEach((bird) => {
      const birdCard = document.createElement("li");
      birdCard.className = "bird-card";

      // Bird Image
      const birdImage = document.createElement("img");
      birdImage.src = bird.thumbnailUrl || "fallback-image.jpg";
      birdImage.alt = bird.commonName || t.unknownBird;
      birdImage.className = "bird-thumbnail";

      // Bird Info
      const birdInfo = document.createElement("div");
      birdInfo.className = "bird-info";

      const birdTitle = document.createElement("h3");
      index += 1
      birdTitle.textContent = `${index}. ${bird.commonName}` || `${index}.  ${t.unknownBird}`;

      // Bird Count
      const countElement = document.createElement("div");
      countElement.className = "bird-count";
      countElement.textContent = `${bird.count}`;

      // Merge
      birdInfo.appendChild(birdTitle);
      birdCard.appendChild(birdImage);
      birdCard.appendChild(birdInfo);
      birdCard.appendChild(countElement);
      birdList.appendChild(birdCard);
    });
  } catch (error) {
    console.error(t.errorMessageStatus, error);
    console.error("Fout bij het ophalen van de top 25 vogels:", error);
  }
}

function refreshAll() {
  if (currentView === "recent") {
    fetchBirds();
  } else {
    fetchTop25Birds();
  }
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

  document
    .getElementById("view-toggle-button")
    .addEventListener("click", () => {
      currentView = currentView === "recent" ? "top25" : "recent";
      refreshAll();
    });

  setInterval(fetchBirds, 600000);
  setInterval(fetchTop25Birds, 600000);
});
