# 🦜 vogel-spotter

❗ Click here for [🇬🇧 English](#-english)

**vogel-spotter** is een webapplicatie die recente vogelwaarnemingen weergeeft vanuit een BirdWeather-station. De applicatie bestaat uit een **FastAPI-backend** en een frontend die wordt geserveerd door **Nginx**.

## 📑 Inhoudsopgave

- [🪺 Doel](#-doel)
- [🐤 Functies](#-functies)
- [🐦‍⬛ Vereisten](#-vereisten)
- [🐣 Installatie](#-installatie)
  - [💻 Lokaal](#-lokaal)
  - [🌐 Server](#-server)
- [🦆 Projectstructuur](#-projectstructuur)
- [🐓 Frontend](#-frontend)
- [🦉 Backend](#-backend)
  - [🦢 API Endpoints](#-api-endpoints)
- [🔒 HTTPS-Portal](#-https-portal)
- [🕊️ Inspiratie](#%EF%B8%8F-inspiratie)
- [🐦 Licentie](#-licentie)
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

### 💻 Lokaal

1. **Clone de repository**:

    ```bash
    git clone https://github.com/iMartzen/vogel-spotter.git
    cd vogel-spotter
    ```

2. **Start het script en volg de instructies**:

    ```bash
    ./run.sh
    ```

    *Als het script geen uitvoerrechten heeft:*

    ```bash
    chmod +x run.sh
    ```

3. **Open je browser** en ga naar:

    ```bash
    https://$HOSTNAME.local
    ```

### 🌐 Server

Gebruik het [Ansible-playbook](/ansible/playbook.yml) om de applicatie te implementeren op een server. Raadpleeg de [README.md](/ansible/README.md) voor vereisten en installatie-instructies.

## 🦆 Projectstructuur

- **`src/`**: Bevat de broncode van de FastAPI-backend en de frontend.
- **`ansible/`**: Bevat de code voor het Ansible playbook
- **`docker-compose.yml`**: Docker Compose-configuratiebestand.
- **`Dockerfile`**: Dockerfile voor het bouwen van de FastAPI-backend.

## 🐓 Frontend

De frontend is een **single-page applicatie (SPA)** gebouwd met vanilla JavaScript. De frontend haalt gegevens op via de API en toont deze dynamisch in de interface.

## 🦉 Backend

De backend is gebouwd met **FastAPI** en biedt de API-endpoints. Deze backend haalt gegevens op van de BirdWeather-API, verwerkt deze en levert ze aan de frontend.

### 🦢 API Endpoints

- **`/api/detections`**: Geeft recente vogelwaarnemingen van het afgelopen uur terug.
- **`/api/status`**: Geeft de status van het BirdWeather-station terug (online/offline).


## 🔒 HTTPS-Portal

De setup maakt gebruik van [https-portal](https://github.com/SteveLTN/https-portal) in de Docker Compose-setup. HTTPS-Portal is een volledig geautomatiseerde HTTPS-server, aangedreven door Nginx, Let's Encrypt en Docker. Het vereenvoudigt het verkrijgen en vernieuwen van SSL-certificaten voor je applicatie.

## 🕊️ Inspiratie

Dit project is geïnspireerd door het <luistervink.nl>-project, dat zich richt op het monitoren en analyseren van vogelgeluiden. vogel-spotter bouwt voort op dat idee door waarnemingen van BirdWeather-stations te integreren in een gebruiksvriendelijke webapplicatie.

## 🐦 Licentie

Dit project is gelicentieerd onder de **MIT-licentie**. Zie het bestand [LICENSE](LICENSE) voor meer details.

## 🐦‍🔥 To Do

### Mogelijke uitbreidingen

- **Dagelijkse top 10**: Voeg een lijst toe met de 10 meest waargenomen vogels van vandaag.
- **Maandelijkse statistieken**: Toon het aantal waarnemingen per vogelsoort gedurende een maand.
- **Top 25 aller tijden**: Voeg een overzicht toe van de 25 meest gespotte vogels sinds het begin van de registratie.

---

## 🇬🇧 English

**vogel-spotter** is a web application that displays recent bird sightings from a BirdWeather station. The application consists of a **FastAPI backend** and a frontend served by **Nginx**.

## 📑 Table of Contents

- [🪺 Purpose](#-purpose)
- [🐤 Features](#-features)
- [🐦‍⬛ Requirements](#-requirements)
- [🐣 Installation](#-installation)
  - [💻 Locally](#-locally)
  - [🌐 Server](#-server)
- [🦆 Project Structure](#-project-structure)
- [🦚 Frontend](#-frontend)
- [🦢 Backend](#-backend)
  - [🐓 API Endpoints](#-api-endpoints)
- [🔒 HTTPS-Portal](#-https-portal-1)
- [🕊️ Inspiration](#%EF%B8%8F-inspiration)
- [🐦 License](#-license)
- [🦤 To Do](#-to-do)

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

### 💻 Locally

1. **Clone the repository**:

    ```bash
    git clone https://github.com/iMartzen/vogel-spotter.git
    cd vogel-spotter
    ```

2. **Run the script and follow the instructions**:

    ```bash
    ./run.sh
    ```

    *If the script does not have execution permissions:*

    ```bash
    chmod +x run.sh
    ```

3. **Open your browser** and navigate to:

    ```bash
    https://$HOSTNAME.local
    ```

### 🌐 Server

Use the [Ansible-playbook](/ansible/playbook.yml) to deploy the application on a server. Refer to the [README.md](/ansible/README.md) for requirements and detailed installation instructions.

## 🦆 Project Structure

- **`src/`**: Contains the source code for the FastAPI backend and the frontend.
- **`ansible/`**: Containts the code for the Ansible playbook
- **`docker-compose.yml`**: Docker Compose configuration file.
- **`Dockerfile`**: Dockerfile for building the FastAPI backend.

## 🦚 Frontend

The frontend is a **single-page application (SPA)** built with vanilla JavaScript. The frontend fetches data via the API and dynamically displays it in the interface.

## 🦢 Backend

The backend is built with **FastAPI** and provides the API endpoints. This backend fetches data from the BirdWeather API, processes it, and delivers it to the frontend.

### 🐓 API Endpoints

- **`/api/detections`**: Returns recent bird sightings from the past hour.
- **`/api/status`**: Returns the status of the BirdWeather station (online/offline).

## 🔒 HTTPS-Portal

The setup uses [https-portal](https://github.com/SteveLTN/https-portal) in the Docker Compose setup. HTTPS-Portal is a fully automated HTTPS server powered by Nginx, Let's Encrypt, and Docker. It simplifies the process of obtaining and renewing SSL certificates for your application.

## 🕊️ Inspiration

This project is inspired by the <luistervink.nl> project, which focuses on monitoring and analyzing bird sounds. vogel-spotter builds on that idea by integrating observations from BirdWeather stations into a user-friendly web application.

## 🐦 License

This project is licensed under the **MIT license**. See the [LICENSE](LICENSE) file for more details.

## 🦤 To Do

### Possible Extensions

- **Daily Top 10**: Add a list of the 10 most observed birds of today.
- **Monthly Statistics**: Show the number of observations per bird species over a month.
- **Top 25 All Time**: Add an overview of the 25 most spotted birds since the start of the registration.
- **Ansible Playbook**: Automatically set up a host with the application including a Let’s Encrypt certificate.
