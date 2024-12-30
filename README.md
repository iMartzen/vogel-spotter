# 🦜 vogel-spotter

Click here for [🇬🇧 English](#-english)

**vogel-spotter** is een webapplicatie die recente vogelwaarnemingen weergeeft vanuit een BirdWeather-station. De applicatie bestaat uit een **FastAPI-backend** en een frontend die wordt geserveerd door **Nginx**.

## 📑 Inhoudsopgave

- [🪺 Doel](#-doel)
- [🐤 Functies](#-functies)
- [🐦‍⬛ Vereisten](#-vereisten)
- [🐣 Installatie](#-installatie)
- [🦆 Projectstructuur](#-projectstructuur)
- [🦢 API Endpoints](#-api-endpoints)
- [🐓 Frontend](#-frontend)
- [🦉 Backend](#-backend)
- [🦚 Nginx](#-nginx)
- [🐦 Licentie](#-licentie)
- [🕊️ Inspiratie](#-inspiratie)
- [🐦‍🔥 To Do](#-to-do)
- [🇬🇧 English](#-english)

## 🪺 Doel

Het doel is om vogelliefhebbers een eenvoudig platform te bieden om vogelactiviteit van een BirdWeather-station te volgen.

## 🐤 Functies

- Weergave van recente vogelwaarnemingen van het afgelopen uur.
- Geeft de status van het BirdWeather-station weer (online/offline).
- Responsief ontwerp geschikt voor verschillende schermformaten.
- Ondersteuning voor dark mode voor gebruik in omgevingen met weinig licht.
- Bevat een refresh-knop voor snelle updates.
- Ondersteuning voor zowel Engels als Nederlands.

## 🐦‍⬛ Vereisten

- **Docker**: Zorg dat Docker op je systeem is geïnstalleerd.
- **Docker Compose**: Vereist om meerdere containers tegelijk te beheren.

## 🐣 Installatie

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

    ```bash
    http://localhost
    ```

## 🦆 Projectstructuur

- **`src/`**: Bevat de broncode van de FastAPI-backend en de frontend.
- **`nginx.conf`**: Configuratiebestand voor Nginx.
- **`docker-compose.yml`**: Docker Compose-configuratiebestand.
- **`Dockerfile`**: Dockerfile voor het bouwen van de FastAPI-backend.

## 🦢 API Endpoints

- **`/api/detections`**: Geeft recente vogelwaarnemingen van het afgelopen uur terug.
- **`/api/status`**: Geeft de status van het BirdWeather-station terug (online/offline).

## 🐓 Frontend

De frontend is een **single-page applicatie (SPA)** gebouwd met vanilla JavaScript. De frontend haalt gegevens op via de API en toont deze dynamisch in de interface.

## 🦉 Backend

De backend is gebouwd met **FastAPI** en biedt de API-endpoints. Deze backend haalt gegevens op van de BirdWeather-API, verwerkt deze en levert ze aan de frontend.

## 🦚 Nginx

**Nginx** wordt gebruikt voor het:

1. Serveren van frontend-bestanden.
2. Doorsturen van API-aanvragen naar de FastAPI-backend.

## 🐦 Licentie

Dit project is gelicentieerd onder de **MIT-licentie**. Zie het bestand [LICENSE](LICENSE) voor meer details.

## 🕊️ Inspiratie

Dit project is geïnspireerd door het <luistervink.nl>-project, dat zich richt op het monitoren en analyseren van vogelgeluiden. vogel-spotter bouwt voort op dat idee door waarnemingen van BirdWeather-stations te integreren in een gebruiksvriendelijke webapplicatie.

## 🐦‍🔥 To Do

### Mogelijke uitbreidingen

- **Dagelijkse top 10**: Voeg een lijst toe met de 10 meest waargenomen vogels van vandaag.
- **Maandelijkse statistieken**: Toon het aantal waarnemingen per vogelsoort gedurende een maand.
- **Top 25 aller tijden**: Voeg een overzicht toe van de 25 meest gespotte vogels sinds het begin van de registratie.
- **Ansible Playbook**: Automatisch een host inrichten met de applicatie inclusief een Let’s Encrypt-certificaat.

<br>
<br>

## 🇬🇧 English

**vogel-spotter** is a web application that displays recent bird sightings from a BirdWeather station. The application consists of a **FastAPI backend** and a frontend served by **Nginx**.

## 📑 Table of Contents

- [🪺 Purpose](#-purpose)
- [🐤 Features](#-features)
- [🐦‍⬛ Requirements](#-requirements)
- [🐣 Installation](#-installation)
- [🦆 Project Structure](#-project-structure)
- [🦢 API Endpoints](#-api-endpoints)
- [🐓 Frontend](#-frontend)
- [🦉 Backend](#-backend)
- [🦚 Nginx](#-nginx)
- [🐦 License](#-license)
- [🕊️ Inspiration](#inspiration)
- [🐦‍🔥 To Do](#-to-do)

## 🪺 Purpose

The goal is to provide bird enthusiasts with a simple platform to track bird activity from a BirdWeather station.

## 🐤 Features

- Display recent bird sightings from the past hour.
- Show the status of the BirdWeather station (online/offline).
- Responsive design suitable for various screen sizes.
- Support for dark mode for use in low-light environments.
- Includes a refresh button for quick updates.
- Support for both English and Dutch.

## 🐦‍⬛ Requirements

- **Docker**: Ensure Docker is installed on your system.
- **Docker Compose**: Required to manage multiple containers simultaneously.

## 🐣 Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/iMartzen/vogel-spotter.git
    cd vogel-spotter
    ```

2. **Create a `.env` file** in the root directory with the following content:

    ```env
    STATION_ID=your_station_id
    ```

3. **Build and start the Docker containers**:

    ```bash
    docker-compose up --build
    ```

4. **Open your browser** and go to:

    ```bash
    http://localhost
    ```

## 🦆 Project Structure

- **`src/`**: Contains the source code for the FastAPI backend and the frontend.
- **`nginx.conf`**: Configuration file for Nginx.
- **`docker-compose.yml`**: Docker Compose configuration file.
- **`Dockerfile`**: Dockerfile for building the FastAPI backend.

## 🦢 API Endpoints

- **`/api/detections`**: Returns recent bird sightings from the past hour.
- **`/api/status`**: Returns the status of the BirdWeather station (online/offline).

## 🐓 Frontend

The frontend is a **single-page application (SPA)** built with vanilla JavaScript. The frontend fetches data via the API and dynamically displays it in the interface.

## 🦉 Backend

The backend is built with **FastAPI** and provides the API endpoints. This backend fetches data from the BirdWeather API, processes it, and delivers it to the frontend.

## 🦚 Nginx

**Nginx** is used for:

1. Serving frontend files.
2. Forwarding API requests to the FastAPI backend.

## 🐦 License

This project is licensed under the **MIT license**. See the [LICENSE](LICENSE) file for more details.

## 🕊️ Inspiration

This project is inspired by the <luistervink.nl> project, which focuses on monitoring and analyzing bird sounds. vogel-spotter builds on that idea by integrating observations from BirdWeather stations into a user-friendly web application.

## 🐦‍🔥 To Do

#### Possible Extensions

- **Daily Top 10**: Add a list of the 10 most observed birds of today.
- **Monthly Statistics**: Show the number of observations per bird species over a month.
- **Top 25 All Time**: Add an overview of the 25 most spotted birds since the start of the registration.
- **Ansible Playbook**: Automatically set up a host with the application including a Let’s Encrypt certificate.
