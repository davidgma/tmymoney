### nvim

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

  " For formatting
  " post install (yarn install | npm install)
  call dein#add('prettier/vim-prettier', { 'build': 'npm install' })

  " Enable deoplete at startup
  let g:deoplete#enable_at_startup = 1

  call dein#end()
  call dein#save_state()
  " call dein#update()
  " call dein#check_clean()


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
"    inoremap <expr><ENTER>  pumvisible() ? "\<C-n>" : "\<ENTER>"

:inoremap ( ()<Esc>i
:inoremap [ []<Esc>i
:inoremap { {}<Esc>i
```

This should enable the spell check functionality. 
- To add a word to the dictionary: zg 
- To get a list of suggestions: z=
- To go to the previous spelling error: [s
- To go to the next spelling error: ]s
- To toggle spell check: F10.

Where some non-functioning plugins cause trouble, I found the following cleaned things out. 
```
rm -rf /home/david/.cache/dein/.cache
# then uncomment the line in the ~/.config/nvim/init.vim that has the 
call dein#update()
# then rerun the commands in nvim:
:UpdateRemotePlugins 
:call dein#install()
# then uncomment the line with the dein#update command again.


```
Some useful websites:
https://www.vimfromscratch.com/articles/setting-up-vim-for-typescript/
https://github.com/prettier/vim-prettier
https://prettier.io/docs/en/vim.html



