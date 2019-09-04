
## Architecture
### Overview
While KMyMoney can be installed and used without much technical knowledge, I don't think this will ever be the case for TMyMoney. It runs in a terminal, it uses node, you need to be able to configure a web server with SSL and authentication if you want to use it over the internet. Setting up a free Google Cloud Platform VM is a good idea too.

This is the architecture of the application and the tools I used in building it.

Server:
Runs on a [Google Cloud Platform free](https://cloud.google.com/free/) VM Uses the [Compute Engine](https://cloud.google.com/compute/) product.
[nginx](https://nginx.org) web server.
Free SSL certificate from [Let's Encrypt](https://letsencrypt.org).
Google Authentication is used to authenticate the user (myself) so that only I can use the web client over the internet for my own installation.

Web client:
Written in [Typescript](https://www.typescriptlang.org) and [Angular](https://angular.io).

Processing KMyMoney file:
The file is a [gzip-compressed xml file](https://docs.kde.org/trunk5/en/extragear-office/kmymoney/details.formats.compressed.html) and I unzip it using [gunzip](https://linux.die.net/man/1/gunzip) and then convert it to a json file using [xml2json](https://github.com/Cheedoong/xml2json).

The server program then parses the json file and writes the bits it needs to an [sqlite3](https://www.sqlite.org/index.html) database which it stores on a drive that is in memory - [/dev/shm](https://www.howtoforge.com/storing-files-directories-in-memory-with-tmpfs).

[SSH](https://help.ubuntu.com/community/SSH/OpenSSH/Configuring) is used to connect to the VM from other computers where a terminal access is wanted, or to use the web client via port forwarding.

For the documentation I used [Hugo](https://gohugo.io) with the [Learn Theme](https://learn.netlify.com/en/).

I used [Visual Studio Code](https://code.visualstudio.com/) as my IDE.