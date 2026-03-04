---
title: An Introduction to SSH
author: Xyroton
description: "What SSH is and how to use it."
image:
  url: "/posts/managing_notes_on_linux/thumbnail.png"
  alt: "A girl taking notes."
pubDate: 2025-06-25
updatedDate: 2025-08-04
tags: ["tools", "linux"]
---
**SSH**, also known as **Secure Shell**, is a cryptographic network protocol which allows for encrypted remote connections between computers.

# Connect to a Server
```bash
ssh <User>@<IP-Address> # use -p flag if not default port 22
```
The first time you connect to a new server, you will be prompted to confirm a key fingerprint (host key), which you can confirm by typing `yes` or deny with `no`.
By confirming with `yes`, the remote machine will be permanently added to the list of known hosts, which you can check by inspecting the contents of `known_hosts`.
Next, you will be prompted to enter your password. Enter it and you will have entered the server.

# Configure
Inside the `.ssh` directory, if not present, create a file with the name `config`. If you enter the following there:
```bash
Host <invent_a_server_name>
  HostName <IP-Address>
  User <User> # e.g. root
  Port <port> # optional
```
> You only need to specify a port if you are not using the default port of SSH, which is 22.

If this file exists, the SSH client will load it and will now know the entry for the Host that you specified. This adds the convenience of no longer having to type out the username and the IP address manually.

# Keys
1. Will make connecting much easier since you no longer need to type the password.
2. If you explicitly disable the password option, the only possibility to connect to the server is via the key, which will make the remote machine more secure.

## Generate a Key
```sh
ssh-keygen # use -t flag if you want to specify a different key type e.g. RSA
# also use -C flag to add a comment if you don't want it to be your user@machinename.
# e.g. ssh-keygen -t RSA -C "<Comment>"
```
1. You will be prompted as to where to save this file. Choose a name.
2. Passphrase: Stays on your local machine; even if someone has the private key, they won't be able to connect to the server without it.
3. Confirm passphrase.

Now you will have two keys.
1. id_<name> # PRIVATE stays on your machine. Never show this to anyone.
2. id_<name>.pub # Public key, safe for anyone to see.

Place the public key on the server in the file `.ssh/authorized_keys` manually or with the command automatically:
```sh
ssh-copy-id -i ~/.ssh/id_<name>.pub <User>@<IP-Address>
```

## SSH Agent
The problem is that one has to enter the passphrase over and over again. But if we use the SSH Agent, the passphrase will be retained in memory, which will then be used to connect to the server.

### Start the SSH agent
```sh
eval "$(ssh-agent)"
# this adds the key to the agent
ssh-add ~/.ssh/id_<User>@<IP-Address> # Notice we use the private key, not the public key.
```

# Server Side with SSH
On your server, navigate to: `/etc/ssh/`
There you can change things like the `port number` or also forbid root login by setting `PermitRootLogin` to `no` or `prohibit-password` (key-based only), which is recommended to prevent brute-force attacks. This is also the place where you can set `PasswordAuthentication` to `no`, which is highly recommended, but ONLY do that if you already have an SSH key relationship with the server fully set up and tested.

Now restart the SSH daemon to load the changes and reconnect to the server. It's best not to close the current session in case there are some errors to fix.
```sh
sudo systemctl restart sshd
```

This was not much more than a simple overview of how to use SSH. For a deeper dive into OpenSSH, a good resource, as it is for many things, is the Arch Wiki: [Arch Wiki](https://wiki.archlinux.org/title/OpenSSH).
