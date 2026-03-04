---
title: An Introduction to SSH
author: Xyroton
description: "What SSH is and how to use it."
image:
  url: "/posts/ssh/thumbnail.png"
  alt: "A boy typing on a Computer."
pubDate: 2026-03-04
tags: ["tools", "linux"]
---

**SSH (Secure Shell)** is a cryptographic network protocol that enables encrypted communication between computers. It is most commonly used to securely access and manage remote servers over a network.


# Connecting to a Server

To connect to a remote server:

```bash
ssh <user>@<ip-address>
# Use -p <port> if the server is not using the default port 22
```

Example:

```bash
ssh root@192.168.1.10
```

## First Connection

The first time you connect to a new server, you will be prompted to verify the server’s **host key fingerprint**:

```
The authenticity of host '192.168.1.10' can't be established.
ECDSA key fingerprint is ...
Are you sure you want to continue connecting (yes/no)?
```

- Type `yes` to trust the server.
- Type `no` to abort the connection.

If you type `yes`, the server’s public host key will be added to your local `~/.ssh/known_hosts` file. This protects you against man-in-the-middle attacks in future connections.

After that, you will be prompted to enter your password. Once authenticated, you are logged into the server.


# SSH Client Configuration

To avoid typing the username and IP address every time, you can configure SSH.

Create (or edit) the file:

```bash
~/.ssh/config
```

Add an entry like this:

```bash
Host myserver
  HostName 192.168.1.10
  User root
  Port 22
```

> You only need to specify `Port` if it is different from the default (22).

Now you can connect using:

```bash
ssh myserver
```

This improves convenience and reduces typing errors.


# SSH Key Authentication

Using SSH keys provides:

1. Easier login (no password typing).
2. Stronger security, especially when password authentication is disabled.

## Generating a Key Pair

```bash
ssh-keygen
```

Optional flags:

- `-t <type>` → specify key type (e.g., `ed25519`, `rsa`)
- `-C "<comment>"` → add a comment to the key

Example:

```bash
ssh-keygen -t ed25519 -C "my-laptop"
```

### During Key Generation

1. Choose a file location (the default is usually fine).
2. Enter a passphrase (strongly recommended).
3. Confirm the passphrase.

You will now have two files:

- `id_ed25519` → **Private key** (keep this secret and never share it)
- `id_ed25519.pub` → **Public key** (safe to share)


## Copying the Public Key to the Server

Your public key must be placed inside:

```
~/.ssh/authorized_keys
```

The easiest way to do this is:

```bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub <user>@<ip-address>
```

This automatically appends your public key to the correct file on the server and sets proper permissions.


# SSH Agent

If your private key is protected with a passphrase, you normally need to enter it each time you use the key.

The SSH agent stores your decrypted key in memory after you unlock it once.

## Starting the SSH Agent

```bash
eval "$(ssh-agent -s)"
```

Add your private key:

```bash
ssh-add ~/.ssh/id_ed25519
```

Important:
You always add the **private key**, never the `.pub` file.

After entering your passphrase once, the agent will handle authentication for future connections during your session.


# Server-Side Configuration

On the server, SSH configuration is located at:

```
/etc/ssh/sshd_config
```

Below are some important security-related settings.

## Disable Root Login

```
PermitRootLogin prohibit-password
```

Options:

- `no` → completely disables root login
- `prohibit-password` → allows only key-based root login (recommended if root login is required)

## Disable Password Authentication

```
PasswordAuthentication no
```

⚠ Only disable password authentication **after** verifying that key-based authentication works correctly. Otherwise, you may lock yourself out of the server.


# Restarting the SSH Service

After making changes to the SSH configuration, restart the SSH daemon:

```bash
sudo systemctl restart sshd
```

On some distributions, the service name may be `ssh` instead of `sshd`.

It is strongly recommended to keep your current SSH session open and test the new configuration in a second session before closing the first one. This prevents accidental lockout due to misconfiguration.


# Conclusion

This was a brief overview of SSH and its basic usage and security practices.

For a deeper dive into OpenSSH configuration and advanced features, a highly recommended resource is the [Arch Wiki](https://wiki.archlinux.org/title/OpenSSH).
