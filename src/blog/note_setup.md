---
title: Managing Notes on Linux
author: Xyroton
description: "Taking Notes, syncing and backing them up on Linux."
image:
  url: "/blog/notes.png"
  alt: "The word astro against an illustration of planets and stars."
pubDate: 2025-06-25
tags: ["notes", "linux"]
---
For note taking I use **[Obsidian](https://obsidian.md/)** for syncing I use **[Syncthing](https://wiki.archlinux.org/title/Syncthing)** and for  backing them up I use **[GitHub](https://github.com/)**, which doesn't just back up your notes but also tracks you changes over time making it extremely powerful. 

**Note:** My shell scrips utilize [Systemd](https://systemd.io/). Should your system use a different intit system you will have to make the necessary adjustment.

# Installion and Configuration
I am on [Arch](https://archlinux.org/)  so the *package manger* for me will be `pacman`, so the Installion instructions might very dependent on the system you are on.

## Obsidian
Is a free [markdown](https://www.markdownguide.org/) though not Open-Source note taking app but it's features are unparalleled. And all your notes are stored locally unlike some of the competitors like [Notion](https://www.notion.com/). 

### Installion
```bash
sudo pacman -S obsidian
```
If you are new to Obsidian you can refer to the [help](uhttps://help.obsidian.md/rl) pages to get started. 

## Syncthing    
We will use *Syncthing* to sync our notes between different devices such as phone and laptop. 

### Installion

```bash
sudo pacman -S syncthing
```

### Configuration
Fist we have to start and start and enable the syncthing service so we can work with it. My init system is `systemd` so that what I will use.
- `enable` starts the service at boot time. To immediately enable it we can append it with the `--now` flag.
- Replace `<user>` with you actual user name.
```bash
sudo systemctl enable --now syncthing@<user>.service
```

Now in you Web browser navigate to:
```bash
http://127.0.0.1:8384/
```
Now it might also be time to download the *syncthing* android or *ios* app. 

Now connect you devices.

If you can not connect you devices check if it might be your firewall. For [ufw](uhttps://wiki.archlinux.org/title/Uncomplicated_Firewallrl) run the following:

```bash
sudo ufw allow syncthing
```
If not google is you best fried.

## Backing Up
For this we will use [git](https://git-scm.com/) and [GitHub](https://github.com/) to host our *git repository*.

### Install git
```bash
sudo pacman -S git
```

### Create GitHub account
If you do not have a [GitHub](https://github.com/) account yet head over and create one. It is free. 
