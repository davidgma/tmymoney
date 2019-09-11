
### tmux ranger neovim

Working in a terminal rather than in a graphical window has the advantages of speed and accessibility. Terminals are always available, and in the case of the Google VM it is the most easily available option. You can work with the VM graphically using SSH with X forwarding but it's really slow.

The disadvantage of working in terminals is that it's all about keyboard shortcuts and so there's a lot to get used to, and the initial setup is much harder for some reason. 

There are 3 main tools that I use for working in a terminal. First, tmux, a newer equivalent of screen, is useful for getting multiple terminals within one terminal and for being able to attach and reattach to your work and having it stay there in the background while you are away.

Second, ranger is a newer version of Midnight Commander and works as a file manager.

Third, neovim is a newer version of vim and is a text editor and can be configured to work with code files as well as an IDE. 

#### tmux

```
sudo apt install tmux
sudo apt install xclip
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

#### ranger

```
sudo apt install ranger
sudo apt install xsel
ranger --version
ranger --copy-config=all
vi ~/.config/ranger/rifle.conf
```

In the rifle.conf file, update the list of file extensions for the editor to include .ts files.

Useful commands in ranger are 
- S to go to a terminal
- yn, yd and yp to copy the file name, directory and path to the clipboard.

A useful list of ranger commands can be found [here](https://gist.github.com/heroheman/aba73e47443340c35526755ef79647eb).

#### nvim

I installed the latest version of neovim from their [web site](https://neovim.io/).

```bash
cd ~/local/dev
mkdir nvim
cd nvim
wget https://github.com/neovim/neovim/releases/download/v0.3.8/nvim.appimage
chmod a+x nvim.appimage
sudo rm /usr/bin/vi
sudo cp ~/local/dev/nvim/nvim.appimage /usr/bin/nvim
sudo ln -s /usr/bin/nvim /usr/bin/vi

```

Installing all the plugins is an awkward process. I'm not completely sure how I did it, but it was something along the following lines.


```
npm install -g neovim
sudo apt install python3-pip
pip3 install --user pynvim

mkdir ~/.config/nvim
vi ~/.config/nvim/init.vim
# copy in the init.vim text further down below. 
curl https://raw.githubusercontent.com/Shougo/dein.vim/master/bin/installer.sh > installer.sh 
sh ./installer.sh ~/.cache/dein 
vi 
:call dein#install()
:UpdateRemotePlugins 
:call dein#install()
:UpdateRemotePlugins 
```

~/.config/nvim/init.vim
```
if &compatible
  set nocompatible
endif

" Add the dein installation directory into runtimepath
set runtimepath+=~/.cache/dein/repos/github.com/Shougo/dein.vim

if dein#load_state('~/.cache/dein')
  call dein#begin('~/.cache/dein')

  call dein#add('~/.cache/dein/repos/github.com/Shougo/dein.vim')
  call dein#add('Shougo/deoplete.nvim')
  if !has('nvim')
    call dein#add('roxma/nvim-yarp')
    call dein#add('roxma/vim-hug-neovim-rpc')
  endif

  " Dein
  call dein#add('HerringtonDarkholme/yats.vim')
  call dein#add('mhartington/nvim-typescript', {'build': './install.sh'})
 " For async completion
 " For Denite features

  call dein#add('Shougo/denite.nvim')



" Enable deoplete at startup

  let g:deoplete#enable_at_startup = 1
  call dein#end()
  call dein#save_state()
endif

filetype plugin indent on
syntax enable

set mouse=a

" spell languages
set spelllang=en_gb
set spell
set spellfile=$HOME/local/scripts/en.utf-8.add

set whichwrap+=<,>,h,l,[,]
set wrap linebreak nolist
set clipboard=unnamedplus
nnoremap <silent> <F10> :set spell!<cr>
inoremap <silent> <F10> <C-O>:set spell!<cr>

" <ENTER>: completion.
    inoremap <expr><ENTER>  pumvisible() ? "\<C-n>" : "\<ENTER>"
```

This should enable the spell check functionality. 
- To add a word to the dictionary: zg 
- To get a list of suggestions: z=
- To go to the previous spelling error: [s
- To go to the next spelling error: ]s
- To toggle spell check: F10.
