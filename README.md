# Vogel Spotter

**Vogel Spotter** is een webapplicatie die recente vogelwaarnemingen weergeeft vanuit een BirdWeather-station. De applicatie bestaat uit een **FastAPI-backend** en een frontend die wordt geserveerd door **Nginx**.

---

## Functies

- Weergave van recente vogelwaarnemingen van het afgelopen uur.
- Geeft de status van het BirdWeather-station weer (online/offline).
- Responsief ontwerp geschikt voor verschillende schermformaten.

---

## Vereisten

- **Docker**: Zorg dat Docker op je systeem is geïnstalleerd.
- **Docker Compose**: Vereist om meerdere containers tegelijk te beheren.

---

## Installatie

1. **Clone de repository**:

    ```bash
    git clone https://github.com/iMartzen/vogel-spotter.git
    cd vogel-spotter
    ```

2. **Maak een `.env`-bestand** in de hoofdmap met de volgende inhoud:

    ```env
    STATION_ID=je_station_id
    ```

3. **Bouw en start de Docker-containers**:

    ```bash
    docker-compose up --build
    ```

4. **Open je browser** en ga naar:

    ```
    http://localhost
    ```

---

## Projectstructuur

- **`src/`**: Bevat de broncode van de FastAPI-backend en de frontend.
- **`nginx.conf`**: Configuratiebestand voor Nginx.
- **`docker-compose.yml`**: Docker Compose-configuratiebestand.
- **`Dockerfile`**: Dockerfile voor het bouwen van de FastAPI-backend.

---

## API Endpoints

- **`/api/detections`**: Geeft recente vogelwaarnemingen van het afgelopen uur terug.
- **`/api/status`**: Geeft de status van het BirdWeather-station terug (online/offline).

---

## Frontend

De frontend is een **single-page applicatie (SPA)** gebouwd met vanilla JavaScript. De frontend haalt gegevens op via de API en toont deze dynamisch in de interface.

---

## Backend

De backend is gebouwd met **FastAPI** en biedt de API-endpoints. Deze backend haalt gegevens op van de BirdWeather-API, verwerkt deze en levert ze aan de frontend.

---

## Nginx

**Nginx** wordt gebruikt voor het:

1. Serveren van frontend-bestanden.
2. Doorsturen van API-aanvragen naar de FastAPI-backend.

---

## Licentie

Dit project is gelicentieerd onder de **MIT-licentie**. Zie het bestand [LICENSE](LICENSE) voor meer details.

---

## To Do

### Mogelijke uitbreidingen

- **Dagelijkse top 10**: Voeg een lijst toe met de 10 meest waargenomen vogels van vandaag.
- **Maandelijkse statistieken**: Toon het aantal waarnemingen per vogelsoort gedurende een maand.
- **Top 25 aller tijden**: Voeg een overzicht toe van de 25 meest gespotte vogels sinds het begin van de registratie.
- **Ansible Playbook**: Automatisch een host inrichten met de applicatie inclusief een Let’s Encrypt-certificaa
- **Dark Mode**: Voeg een donker thema toe voor een betere gebruikerservaring in de avonduren.
- **Refresh button**: Voeg een button toe die in-pagina refresh doet.
