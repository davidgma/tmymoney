
### tmux ranger neovim

Working in a terminal rather than in a graphical window has the advantages of speed and accessibility. Terminals are always available, and in the case of the Google VM it is the most easily available option. You can work with the VM graphically using SSH with X forwarding but it's really slow.

The disadvantage of working in terminals is that it's all about keyboard shortcuts and the initial setup is much harder for some reason. So it takes a lot of getting used to.

There are 3 main tools that I use for working in a terminal. First, tmux, a newer equivalent of screen, is useful for getting multiple terminals within one terminal and for being able to attach and reattach to your work and having it stay there in the background while you are away.

Second, ranger is a newer version of Midnight Commander and works as a file manager.

Third, neovim is a newer version of vim and is a text editor and can be configured to work with code files as well as an IDE. 

#### tmux

```
sudo apt install tmux
sudo apt install xsel
tmux -V
tmux new -s main
ctrl+b c # create a new window
ctrl+b , # rename the new window
ctrl+b d # detach from the session
tmux ls 
tmux attach -t main
```
A good list of commands is at https://tmuxcheatsheet.com.

To copy text inside a tmux window, hold the shift key while dragging with the mouse and it will then work as normal.

The config file is ~/.tmux.conf.



