
### ranger

```
sudo apt install ranger
sudo apt install xsel
ranger --version
ranger --copy-config=all
vi ~/.config/ranger/rifle.conf
vi ~/.bashrc
```

In the rifle.conf file, update the list of file extensions for the editor to include .ts files.

In the .bashrc file, put the following line so that ranger uses neovim as the default editor:

```
export EDITOR="/usr/bin/vi"
```

Useful commands in ranger are 
- S to go to a terminal
- yn, yd and yp to copy the file name, directory and path to the clipboard.

A useful list of ranger commands can be found [here](https://gist.github.com/heroheman/aba73e47443340c35526755ef79647eb).

