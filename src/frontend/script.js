async function fetchBirds() {
  try {
    const response = await fetch("/api/detections");
    const data = await response.json();
    const birdList = document.getElementById("bird-list");
    birdList.innerHTML = "";

    if (data.detections.length === 0) {
      const noBirds = document.createElement("li");
      noBirds.className = "bird-card";
      const noBirdsText = document.createElement("p");
      noBirdsText.textContent = "Geen waarnemingen in het afgelopen uur";
      noBirds.appendChild(noBirdsText);
      birdList.appendChild(noBirds);
      return;
    }

    data.detections.forEach((detection) => {
      const birdCard = document.createElement("li");
      birdCard.className = "bird-card";

      // Bird image
      const birdImage = document.createElement("img");
      birdImage.src = detection.thumbnailUrl || "fallback-image.jpg";
      birdImage.alt = detection.commonName || "Onbekende vogel";
      birdImage.className = "bird-thumbnail";

      // Bird info
      const birdInfo = document.createElement("div");
      birdInfo.className = "bird-info";

      const birdTitle = document.createElement("h3");
      birdTitle.textContent = detection.commonName || "Onbekende vogel";

      const birdTime = document.createElement("p");
      birdTime.textContent = `Gehoord om: ${detection.time || "Onbekend tijdstip"}`;

      // Time of detection
      const timeElement = document.createElement("div");
      timeElement.className = "bird-time";
      timeElement.textContent = detection.time || "Onbekend";

      // Append elements to card
      birdInfo.appendChild(birdTitle);
      birdInfo.appendChild(birdTime);
      birdCard.appendChild(birdImage);
      birdCard.appendChild(birdInfo);
      birdCard.appendChild(timeElement);
      birdList.appendChild(birdCard);
    });
  } catch (error) {
    console.error("Error fetching bird data:", error);
  }
}

// Fetch birds initially and every 10 minutes
fetchBirds();
setInterval(fetchBirds, 600000);

async function fetchStatus() {
  try {
    const response = await fetch("/api/status");
    const data = await response.json();
    const statusIndicator = document.getElementById("status-indicator");
    if (statusIndicator) {
      if (data.status) {
        statusIndicator.innerHTML = "🟢 Online";
        statusIndicator.className = "status-indicator status-online";
        statusIndicator.title = "Online: Geldige activiteit gedetecteerd in het afgelopen uur.";
      } else {
        statusIndicator.innerHTML = "🔴 Offline";
        statusIndicator.className = "status-indicator status-offline";
        statusIndicator.title = "Offline: Geen geldige activiteit gedetecteerd in het afgelopen uur.";
      }
    }
  } catch (error) {
    console.error("Error fetching status:", error);
  }
}

// Fetch status initially and every minute
fetchStatus();
setInterval(fetchStatus, 60000);

// Event listeners for buttons
document.getElementById("refresh-button").addEventListener("click", fetchBirds);

document.getElementById("theme-toggle-button").textContent = "☀️ Light Mode";

document.getElementById("theme-toggle-button").addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  document.getElementById("theme-toggle-button").textContent = newTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
  
  const githubIcon = document.querySelector(".footer a img");
  githubIcon.src = newTheme === "dark" ? "images/github-icon-white.svg" : "images/github-icon.svg";
});