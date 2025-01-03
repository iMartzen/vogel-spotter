# 🦜 Ansible Playbook voor vogel-spotter

❗ Click here for [🇬🇧 English](#-english)

Deze map bevat een Ansible-playbook om de **vogel-spotter** applicatie op te zetten en te configureren.

## 📑 Inhoudsopgave

- [📘 Playbook](#-playbook)
- [📂 Rollen](#-rollen)
- [🖥️ Ondersteunde Distributies](#%EF%B8%8F-ondersteunde-distributies)
- [📋 Vereisten](#-vereisten)
- [👩‍💻 Ansible Installatie Instructies](#-ansible-installatie-instructies)
  - [🖥️ Windows](-windows)
  - [🐧 Linux (Debian/Ubuntu)](-linux)
  - [🍎 macOS](-macos)
- [🛠️ Gebruik](#%EF%B8%8F-gebruik)
- [📜 Beschrijvingen van Rollen](#-beschrijvingen-van-rollen)
- [🔒 HTTPS-Portal](#-https-portal)

## 📘 Playbook

- `playbook.yml`: Hoofdplaybook om de applicatie in te richten.

## 📂 Rollen

- `python-bootstrap`: Installeert Python op de host.
- `update-system`: Update de systeemsoftware.
- `setup-docker`: Installeert Docker en Docker Compose.
- `setup-application`: Richt de vogel-spotter-applicatie in.

## 🖥️ Ondersteunde Distributies

- Ubuntu (voorlopig).

Dit betekent dat dit playbook alleen geschreven is voor servers met een Ubuntu-besturingssysteem (voorlopig). Het maakt niet uit welk systeem je gebruikt om Ansible uit te voeren, zolang de doelserver maar op Ubuntu draait. Je bent van harte welkom om een PR in te dienen voor ondersteuning van andere besturingssystemen.

## 📋 Vereisten

- **Ansible**: Volg de onderstaande instructies om Ansible te installeren op jouw besturingssysteem.

## 👩‍💻 Ansible Installatie Instructies

### 🖥️ Windows

1. Installeer de Windows Subsystem for Linux (WSL).
2. Open de Microsoft Store en installeer een Linux-distributie (bijvoorbeeld Ubuntu).
3. Start de WSL en voer het volgende commando uit om Ansible te installeren:

    ```bash
    sudo apt update
    sudo apt install ansible -y
    ```

### 🐧 Linux (Debian/Ubuntu)

1. Update je pakketbeheer en installeer Ansible:

    ```bash
    sudo apt update
    sudo apt install ansible -y
    ```

### 🍎 macOS

1. Installeer Homebrew als je dit nog niet hebt:

    ```bash
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```

2. Gebruik Homebrew om Ansible te installeren:

    ```bash
    brew install ansible
    ```

## 🛠️ Gebruik

1. **Voer het playbook uit** met het volgende commando:

    ```bash
    ansible-playbook -i inventory.ini playbook.yml
    ```

2. Tijdens de uitvoering wordt gevraagd om:
   - **Domeinnaam**
   - **Omgeving** (bijvoorbeeld productie of staging)
   - **BirdWeather station ID**

   Deze waarden worden gebruikt om de applicatie correct te configureren.

3. Je kunt ook de standaardwaarden voor deze variabelen instellen in het bestand [`group_vars/all.yml`](group_vars/all.yml). Dit bestand bevat standaardinstellingen voor de applicatie en kan worden aangepast aan je behoeften.

## 📜 Beschrijvingen van Rollen

### [python-bootstrap](roles/python-bootstrap)

Installeert Python op de host.

Kenmerken:

- Installeert Python als dit nog niet aanwezig is.
- Zorgt dat de juiste versie van Python beschikbaar is.

### [update-system](roles/update-system)

Update de systeemsoftware.

Kenmerken:

- Update alle geïnstalleerde pakketten naar de nieuwste versies.
- Zorgt dat het systeem up-to-date is met beveiligingspatches.

### [setup-docker](roles/setup-docker)

Installeert Docker en Docker Compose.

Kenmerken:

- Installeert de Docker-engine.
- Installeert Docker Compose.
- Configureert Docker om automatisch op te starten bij het opstarten van het systeem.

### [setup-application](roles/setup-application)

Richt de vogel-spotter-applicatie in en draait deze op het doelsysteem.

Kenmerken:

- Installeert benodigde afhankelijkheden.
- Kopieert de applicatiecode naar het doelsysteem.
- Richt een Python virtual environment in.
- Configureert en activeert de vogel-spotter systemd-service.
- Genereert een `.env`-bestand met het Birdweather station ID

## 🔒 HTTPS-Portal

Het playbook gebruikt [https-portal](https://github.com/SteveLTN/https-portal) in de Docker Compose-setup. HTTPS-Portal is een volledig geautomatiseerde HTTPS-server, aangedreven door Nginx, Let's Encrypt en Docker. Het vereenvoudigt het verkrijgen en vernieuwen van SSL-certificaten voor je applicatie.

---

# 🇬🇧 English

This folder contains Ansible playbooks to set up and configure the **vogel-spotter** application.

## 📑 Table of Contents

- [📗 Playbook](#-playbook-1)
- [📂 Roles](#-roles)
- [🖥️ Supported Distributions](#%EF%B8%8F-supported-distributions)
- [📋 Requirements](#-requirements)
- [👩‍💻 Ansible Installation Instructions](#-ansible-installation-instructions)
  - [🖥️ Windows](-windows)
  - [🐧 Linux (Debian/Ubuntu)](-linux)
  - [🍎 macOS](-macos)
- [🛠️ Usage](#%EF%B8%8F-usage)
- [📜 Role Descriptions](#-role-descriptions)
- [🔒 HTTPS-Portal](#-https-portal-1)

## 📗 Playbook

- `playbook.yml`: Main playbook to set up the application.

## 📂 Roles

- `python-bootstrap`: Bootstrap the host with Python.
- `update-system`: Updates the system packages.
- `setup-docker`: Installs Docker and Docker Compose.
- `setup-application`: Sets up the vogel-spotter application.

## 🖥️ Supported Distributions

- Ubuntu (for now). Feel free to create a PR to support other families.

This means that this playbook is currently designed only for servers running an Ubuntu operating system. It does not matter which system you use to run Ansible, as long as the target server is running Ubuntu. Contributions via PR to support other operating systems are welcome!

## 📋 Requirements

- **Ansible installed**: Follow the instructions below to install Ansible on your operating system.

### 👩‍💻 Ansible Installation Instructions

#### 🖥️ Windows

1. Install Windows Subsystem for Linux (WSL).
2. Open the Microsoft Store and install a Linux distribution (e.g., Ubuntu).
3. Start WSL and run the following command to install Ansible:

    ```bash
    sudo apt update
    sudo apt install ansible -y
    ```

#### 🐧 Linux (Debian/Ubuntu)

1. Update your package manager and install Ansible:

    ```bash
    sudo apt update
    sudo apt install ansible -y
    ```

#### 🍎 macOS

1. Install Homebrew if you haven't already:

    ```bash
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```

2. Use Homebrew to install Ansible:

    ```bash
    brew install ansible
    ```

## 🛠️ Usage

Run the playbook with the following command:

```bash
ansible-playbook -i inventory.ini playbook.yml
```

You will be prompted to enter the domain, environment stage (e.g., production, staging), and BirdWeather station ID for the application during the playbook execution. These values are used to configure the application correctly.

You can also set default values for these variables in the [`group_vars/all.yml`](group_vars/all.yml) file. This file contains default settings for the application and can be customized to suit your needs.

## 📜 Role Descriptions

### [python-bootstrap](roles/python-bootstrap)

Bootstraps the host with Python.

Features:

- Installs Python if not already present.
- Ensures the correct version of Python is available.

### [update-system](roles/update-system)

Updates the system packages.

Features:

- Updates all installed packages to their latest versions.
- Ensures the system is up-to-date with security patches.

### [setup-docker](roles/setup-docker)

Installs Docker and Docker Compose.

Features:

- Installs Docker engine.
- Installs Docker Compose.
- Configures Docker to start on boot.

### [setup-application](roles/setup-application)

Sets up and runs the vogel-spotter application on the target system.

Features:

- Installs required dependencies.
- Copies application code to the target system.
- Sets up a Python virtual environment.
- Configures and enables the vogel-spotter systemd service.
- Generates a `.env` file with the Birdweather station ID

## 🔒 HTTPS-Portal

The playbook uses [https-portal](https://github.com/SteveLTN/https-portal) in the Docker Compose setup. HTTPS-Portal is a fully automated HTTPS server powered by Nginx, Let's Encrypt, and Docker. It simplifies the process of obtaining and renewing SSL certificates for your application.
