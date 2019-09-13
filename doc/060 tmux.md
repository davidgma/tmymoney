
### tmux

```
sudo apt install tmux
sudo apt install xclip
sudo apt install bc
tmux -V
tmux new -s main
ctrl+b c # create a new window
ctrl+b , # rename the new window
ctrl+b d # detach from the session
tmux ls 
tmux attach -t main
```
A good list of commands is at https://tmuxcheatsheet.com.

A good explanation of copying to the main clipboard is at https://www.rushiagr.com/blog/2016/06/16/everything-you-need-to-know-about-tmux-copy-pasting-ubuntu/.

To copy text inside a tmux window, hold the shift key while dragging with the mouse and it will then work as normal. But you can also just drag the mouse over text to be copied.

The config file is ~/.tmux.conf.
```
set -g mouse on 
bind P paste-buffer
bind-key -T copy-mode-vi v send-keys -X begin-selection
bind-key -T copy-mode-vi y send-keys -X copy-selection
bind-key -T copy-mode-vi r send-keys -X rectangle-toggle
set-option -g set-clipboard on
bind-key -T copy-mode-vi y send-keys -X copy-pipe "xclip -sel clip -i"
bind-key -T copy-mode-vi MouseDragEnd1Pane send-keys -X copy-pipe "xclip -sel clip -i"
```

