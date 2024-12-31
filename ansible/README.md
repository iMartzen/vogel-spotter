# Ansible Playbooks for Vogel Spotter

This folder contains Ansible playbooks to set up and configure the vogel-spotter application.

## Playbook

- `playbook.yml`: Main playbook to set up the application.

## Roles

- `python-bootstrap`: Bootstrap the host with Python
- `update-system`: Updates the system packages.
- `setup-docker`: Installs Docker and Docker Compose.
- `setup-application`: Sets up the vogel-spotter application.

## Supported Distributions

- Ubuntu

## Usage

Run the playbook with the following command:

```bash
ansible-playbook -i inventory.ini playbook.yml
```

You will be prompted to enter the domain for the application during the playbook execution.
