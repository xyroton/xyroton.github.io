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

#### TODO for you 
- Create a repo and clone it.
- Start *Obsidian* and chose your *git repo* as your vault. 

# Autocommit
At this point you should have everything working that you need for your functional note taking setup. You have:
- **Obsidian** to take Notes.
- **Syncthing** to sync you Notes with other devives.
- **Git** to track your note chages.
- **GitHub** to host you git repo, to access it from anywhere. 

One *inconvenience* that is left over to fix it the committing and pushing of your note changes. Right now one has to manually `git commit` and `git push` all the changes which quickly will become a major time consumer. 

So we will automate this.

### Shell scrip 
One thing I love about unix system espically in linux is the fact you can easily  automate tasks by writing a simple shell scripts. Lets write one!
Start by creating the following file: `git_auto_commit.sh`

```bash
#!/bin/bash

export HOME=/home/<user>
git config --global --add safe.directory /home/<user>/<git-repo>

cd /home/<user>/<git-repo> || exit

git add .

git commit -m "Automatic commit $(date +'%Y-%m-%d %H:%M:%S')"

git push origin main
```

You might also want to check if `.local/bin` is in your **PATH**, if not you will run in into problems later (for most linux distros out there it will be in PATH by default, but bare bones arch it will not be).

Check by running:
```bash
echo "$PATH" | grep -q "$HOME/.local/bin" && echo "In PATH, you are in luck!" || echo "Not in PATH, do not worry we will fix this!"
```

#### Add to PATH (skip if it is in PATH for you) 
If it tells you it is not in PATH, you have to add this to your default `shellrc`.
For me it is **bash** so I run to `.bashrc`:
```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
```
 if you are running **zsh** run:
 ```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
 ```

### Executing `git_auto_commit.sh`
We are going to create a **systemd** service that is going to auto run the shell script for us. We will have to do this as root. I will use neovim to to edit these files please feel free use what you want.

#### Create systemd service
Run the follwing: `sudo nvim /etc/systemd/system/git_auto_commit.service`
this will create the file `git_auto_commit.service` and open it in neovim.

Put the following in `git_auto_commit.service`:

```bash
[Unit]
Description=Git Auto Commit Service

[Service]
Type=oneshot
User=xo
ExecStart=/home/xo/.local/bin/git_auto_commit.sh
```


#### Create systemd timer
Now we will create a timer that will execute out service every 4 hours, in other words commit our changes and push them to GitHub.

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

#### Enable the service
The last step is to enable the service, run the following commands:
```bash
sudo systemctl daemon-reload
sudo systemctl enable --now git_auto_commit.timer
```

You can check the status by running:
```bash
systemctl status git_auto_commit.timer
```

If you encounter any problems it might be usefull to check the actions of the systemd service by running:
```bash
journalctl -u git_auto_commit.service
```

You can also manually trigger the service by running which also can be useful for debugging:
```bash
sudo systemctl start git_auto_commit.service
 ``` 

# Final Words 
By now you should have functional and save (not in terms of security) way to take notes locally without the fear of overwriting or losing them as with other services e.g. Notion is the case, but the loss of the power to sync your notes with different devices.  

If you have any suggestions or improvements feel free to message me.
