---
title: Managing Notes on Linux
author: Xyroton
description: "Taking Notes, syncing and backing them up on Linux."
image:
  url: "/blog/notes.png"
  alt: "The word astro against an illustration of planets and stars."
pubDate: 2025-06-25
updatedDate: 2025-06-29
tags: ["notes", "linux"]
---
For note-taking, I use **[Obsidian](https://obsidian.md/)**. For syncing, I use **[Syncthing](https://wiki.archlinux.org/title/Syncthing)**. And for backing them up, I use **[GitHub](https://github.com/)**, which not only backs up your notes but also tracks your changes over time, making it extremely powerful.

**Note:** My shell scripts utilize [Systemd](https://systemd.io/). Should your system use a different init system, you will have to make the necessary adjustments.

# Installation and Configuration
I am on [Arch](https://archlinux.org/), so the *package manager* for me will be `pacman`. Therefore, the installation instructions may vary depending on the system you are on.

## Obsidian
Obsidian is a free [markdown](https://www.markdownguide.org/)-based, though not open-source, note-taking app. Its features are unparalleled, and all your notes are stored locally, unlike some competitors like [Notion](https://www.notion.com/).

### Installation
```bash
sudo pacman -S obsidian
```
If you are new to Obsidian, you can refer to the [help](https://help.obsidian.md/) pages to get started. 

## Syncthing
We will use *Syncthing* to synchronize our notes between different devices, such as phones and laptops.

### Installation

```bash
sudo pacman -S syncthing
```

### Configuration
First, we need to start and enable the Syncthing service so we can work with it. My init system is `systemd`, so that's what I will use.
- `enable` starts the service at boot time. To immediately enable it, we can append the `--now` flag.
- Replace `<user>` with your actual username.
```bash
sudo systemctl enable --now syncthing@<user>.service
```

Now, in your web browser, navigate to:
```bash
http://127.0.0.1:8384/
```
It might also be a good time to download the *Syncthing* Android or iOS app.

Now, connect your devices.

If you cannot connect your devices, check your firewall. For [UFW](https://wiki.archlinux.org/title/Uncomplicated_Firewall) run the following:

```bash
sudo ufw allow syncthing
```
If not, Google is your best friend.

## Backing Up
For this, we will use [Git](https://git-scm.com/) and [GitHub](https://github.com/) to host our *Git repository*.

### Install Git
```bash
sudo pacman -S git
```

### Create GitHub Account
If you do not have a [GitHub](https://github.com/) account yet, head over and create one. It is free.

#### TODO for you
- Create a repo and clone it.
- Start *Obsidian* and choose your *Git repo* as your vault. 

# Autocommit
At this point, you should have everything working that you need for your functional note-taking setup. You have:
- **Obsidian** to take notes.
- **Syncthing** to sync your notes with other devices.
- **Git** to track your note changes.
- **GitHub** to host your Git repo, to access it from anywhere.

One *inconvenience* that is left to fix is the committing and pushing of your note changes. Right now, one has to manually `git commit` and `git push` all the changes, which quickly becomes a major time consumer.

So, we will automate this.

## Shell Script
One thing I love about Unix systems, especially Linux, is the fact that you can easily automate tasks by writing simple shell scripts. Let's write one!
Start by creating the following file: `~/.local/bin/git_auto_commit.sh`

```bash
#!/bin/bash

export HOME=/home/<user>
git config --global --add safe.directory /home/<user>/<git-repo>

cd /home/<user>/<git-repo> || exit

git add .

git commit -m "Automatic commit $(date +'%Y-%m-%d %H:%M:%S')"

git push origin main
```

You might also want to check if `.local/bin` is in your **PATH**. If not, you will run into problems later (for most Linux distros out there, it will be in PATH by default, but for bare-bones Arch, it will not be).

Check by running:
```bash
echo "$PATH" | grep -q "$HOME/.local/bin" && echo "In PATH, you are in luck!" || echo "Not in PATH, do not worry we will fix this!"
```

> ### Add to PATH (skip if it is in PATH for you) 
> If it tells you it is not in PATH, you have to add this to your default `shellrc`.
> For me it is **bash** so I run to `.bashrc`:
> ```bash
> echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
> ```
> if you are running **zsh** run:
> ```bash
> echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
> ```

## Executing `git_auto_commit.sh`
We are going to create a **systemd** service that will automatically run the shell script for us. We will have to do this as root. I will use Neovim to edit these files; feel free to use what you want.

### Create systemd Service
Run the following: `sudo nvim /etc/systemd/system/git_auto_commit.service`
This will create the file `git_auto_commit.service` and open it in Neovim.

Put the following in `git_auto_commit.service`:

```bash
[Unit]
Description=Git Auto Commit Service

[Service]
Type=oneshot
User=<user>
ExecStart=/home/<user>/.local/bin/git_auto_commit.sh
```


### Create systemd Timer
Now we will create a timer that will execute our service every 4 hours; in other words, it will commit our changes and push them to GitHub.

Create this file: `/etc/systemd/system/git_auto_commit.timer`:
```bash
[Unit]
Description=Runs git_auto_commit.service every 4 hours

[Timer]
OnBootSec=10min
OnUnitActiveSec=2h

[Install]
WantedBy=timers.target
```

### Enable the Service
The last step is to enable the service. Run the following commands:
```bash
sudo systemctl daemon-reload
sudo systemctl enable --now git_auto_commit.timer
```

You can check the status by running:
```bash
systemctl status git_auto_commit.timer
```

If you encounter any problems, it might be useful to check the actions of the systemd service by running:
```bash
journalctl -u git_auto_commit.service
```

You can also manually trigger the service by running (which can also be useful for debugging):
```bash
sudo systemctl start git_auto_commit.service
 ``` 

# Final Words
By now, you should have a functional and safe (in terms of data integrity, not security) way to take notes locally without the fear of overwriting or losing them, as can be the case with other services (e.g., Notion), which often sacrifice local control for syncing convenience.

If you have any suggestions or improvements, feel free to message me.
