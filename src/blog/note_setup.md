---
title: Managing Notes on Linux
author: Xyroton
description: "Taking notes, syncing, and backing them up on Linux."
image:
  url: "/blog/notes.png"
  alt: "A girl taking notes."
pubDate: 2025-06-25
updatedDate: 2025-06-30
tags: ["notes", "linux"]
---

Here’s how I write and manage my notes and sync them between different devices on Linux without depending on services like Notion.

The setup is simple:
- I write notes in [**Obsidian**](https://obsidian.md/)
- I sync notes across devices with [**Syncthing**](https://wiki.archlinux.org/title/Syncthing)
- I back them up and version them using [**Git**](https://git-scm.com/) and [**GitHub**](https://github.com/)

> **Note:** My system uses `systemd` (which is usually the default on most systems). If you're using something else you'll need to adapt the relevant parts.

 

# Obsidian

Obsidian is a Markdown-based note-taking app with a strong community and a big plugin ecosystem. It’s free (not open source), and all your notes are plain `.md` files stored locally — no forced cloud syncs.

## Install Obsidian (Arch Linux)
```bash title="Terminal"
sudo pacman -S obsidian
```

If you're new to Obsidian, the [help docs](https://help.obsidian.md/) are pretty useful to get started.

 

# Syncthing

To keep notes synced between devices (like your phone and laptop), I use Syncthing. It works over LAN, and you control everything.

## Install Syncthing
```bash title="Terminal"
sudo pacman -S syncthing
```

## Enable and Start the Service
```bash title="Terminal"
sudo systemctl enable --now syncthing@<user>.service
```

> Replace `<user>` with your actual username.

Then open [http://127.0.0.1:8384](http://127.0.0.1:8384) in your browser — this is the Syncthing web UI.

## Mobile Syncing
Install the Syncthing app on Android or iOS to sync your notes to your phone.

## Firewall (if devices can't connect)
If you're using [UFW](https://wiki.archlinux.org/title/Uncomplicated_Firewall), run:
```bash title="Terminal"
sudo ufw allow syncthing
```

If you’re not using UFW, a quick Google search will help you figure it out 🤗.

 

# Git & GitHub Backup

Syncthing handles syncing, but it doesn’t track changes. That’s where Git comes in. With Git, you get **version history** and we will use GitHub to host the git repo to be able to access it from anywhere.

## Install Git
```bash title="Terminal"
sudo pacman -S git
```

## Create a GitHub Repo
If you don’t already have a GitHub account, now’s the time. Create a private repo for your notes and clone it locally.
- Then create a new folder inside the GitHub repo we just cloned.
- In Obsidian, set that folder (not the root of the repo itself) as your vault.
 

# Automating Git Commits

You could manually `git commit` and `git push` your changes every day… but that can be labour intensive. Let’s automate it.

## Write a Commit Script

Create this script at `~/.local/bin/git_auto_commit.sh`:

```js showLineNumbers
#!/bin/bash

export HOME=/home/<user>
git config --global --add safe.directory /home/<user>/<git-repo>

cd /home/<user>/<git-repo> || exit

git add .
git commit -m "Auto-commit $(date +'%Y-%m-%d %H:%M:%S')"
git push origin main
```

Make sure to replace:
- `<user>` with your actual Linux username
- `<git-repo>` with the folder name of your GitHub repo

Make it executable:
```bash title="Terminal"
chmod +x ~/.local/bin/git_auto_commit.sh
```

## Add `.local/bin` to PATH (if needed)

Check if it's already in your `$PATH`:
```bash title="Terminal"
echo "$PATH" | grep -q "$HOME/.local/bin" && echo "You're good!" || echo "Need to add it."
```

> If not, add it to your shell config:
> 
> ### For Bash:
> ```bash title="Terminal"
> echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
> ```
> 
> ### For Zsh:
> ```bash title="Terminal"
> echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
> ```

 

# systemd Automation

We’ll create a `systemd` timer that runs the script every 2 hours.

## Create the Service

Create this file:  
`/etc/systemd/system/git_auto_commit.service`

e.g. with neovim `sudo nvim /etc/systemd/system/git_auto_commit.service`

```ini showLineNumbers
[Unit]
Description=Git Auto Commit Service

[Service]
Type=oneshot
User=<user>
ExecStart=/home/<user>/.local/bin/git_auto_commit.sh
```

## Create the Timer

Create this file:  
`/etc/systemd/system/git_auto_commit.timer`

e.g. with neovim `sudo nvim /etc/systemd/system/git_auto_commit.timer`

```ini showLineNumbers
[Unit]
Description=Run git_auto_commit.service every 2 hours

[Timer]
OnBootSec=10min
OnUnitActiveSec=2h

[Install]
WantedBy=timers.target
```

## Enable the Timer

Reload `systemd` and start the timer:

```bash title="Terminal"
sudo systemctl daemon-reload
sudo systemctl enable --now git_auto_commit.timer
```

You can check the timer’s status with:
```bash title="Terminal"
systemctl status git_auto_commit.timer
```

And see logs with:
```bash title="Terminal"
journalctl -u git_auto_commit.service
```

To test it manually:
```bash title="Terminal"
sudo systemctl start git_auto_commit.service
```

 

# Final Thoughts

That’s it! With this setup you get:

- [x] Local-first note-taking  
- [x] Syncing across all your devices  
- [x] Automatic version control

With this setup no one will be able to hold your notes hostage. If you have ideas to improve this setup, or if something doesn’t work as expected, feel free to reach out.

