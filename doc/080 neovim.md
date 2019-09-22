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
Also, remember to add tags to all .gitignore files.


```
npm install -g neovim
sudo apt install python3-pip
pip3 install --user pynvim
sudo snap install universal-ctags
sudo ln -s /snap/universal-ctags/current/bin/ctags /usr/bin/ctags

mkdir ~/.config/nvim
vi ~/.config/nvim/init.vim
# copy in the init.vim text further down below. 

mkdir $HOME/.ctags.d
vi $HOME/.ctags.d/default.ctags
# copy in the default.ctags text further down.

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
" The following line is only needed where accessed over SSH
set guicursor=

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

  " For dictionary completion 
  call dein#add('deoplete-plugins/deoplete-dictionary')

  " For formatting
  " post install (yarn install | npm install)
  call dein#add('prettier/vim-prettier', { 'build': 'npm install' })

  " Enable deoplete at startup
  let g:deoplete#enable_at_startup = 1

  " For tags 
  call dein#add('ludovicchabant/vim-gutentags')
  call dein#add('majutsushi/tagbar')

" For comment toggling
  call dein#add('tpope/vim-commentary')

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
" set spell
set spellfile=$HOME/local/scripts/en.utf-8.add

set whichwrap+=<,>,h,l,[,]
set wrap linebreak nolist
set clipboard=unnamedplus
nnoremap <silent> <F10> :set spell!<cr>
inoremap <silent> <F10> <C-O>:set spell!<cr>

" <ENTER>: completion.
    inoremap <expr><ENTER>  pumvisible() ? "\<C-n>" : "\<ENTER>"
:inoremap ( ()<Esc>i
:inoremap [ []<Esc>i
:inoremap { {}<Esc>i

" Sample configuration for dictionary source with multiple
" dictionary files.
setlocal dictionary+=/usr/share/dict/words
setlocal dictionary+=/usr/share/dict/british-english
" Remove this if you'd like to use fuzzy search
call deoplete#custom#source(
\ 'dictionary', 'matchers', ['matcher_head'])
" If dictionary is already sorted, no need to sort it again.
call deoplete#custom#source(
\ 'dictionary', 'sorters', [])
" Do not complete too short words
call deoplete#custom#source(
			\ 'dictionary', 'min_pattern_length', 3)

" map alt up and down to move a line 
nnoremap <A-Down> :m+<cr>
nnoremap <A-Up> :m .-2<cr> 


```

from https://github.com/jb55/typescript-ctags
$HOME/.ctags.d/default.ctags 
```
--langdef=typescript
--langmap=typescript:.ts.tsx
--regex-typescript=/^[ \t]*(export[ \t]+([a-z]+[ \t]+)?)?class[ \t]+([a-zA-Z0-9_$]+)/\3/c,classes/
--regex-typescript=/^[ \t]*(declare[ \t]+)?namespace[ \t]+([a-zA-Z0-9_$]+)/\2/c,modules/
--regex-typescript=/^[ \t]*(export[ \t]+)?module[ \t]+([a-zA-Z0-9_$]+)/\2/n,modules/
--regex-typescript=/^[ \t]*(export[ \t]+)?(default[ \t]+)?(async[ \t]+)?function(\*)?[ \t]+([a-zA-Z0-9_$]+)/\5/f,functions/
--regex-typescript=/^[ \t]*export[ \t]+(var|let|const)[ \t]+([a-zA-Z0-9_$]+)/\2/v,variables/
--regex-typescript=/^[ \t]*(var|let|const)[ \t]+([a-zA-Z0-9_$]+)[ \t]*=[ \t]*function[ \t]*[*]?[ \t]*\(\)/\2/v,varlambdas/
--regex-typescript=/^[ \t]*(export[ \t]+)?(public|protected|private)[ \t]+(static[ \t]+)?(abstract[ \t]+)?(((get|set|readonly)[ \t]+)|(async[ \t]+[*]*[ \t]*))?([a-zA-Z1-9_$]+)/\9/m,members/
--regex-typescript=/^[ \t]*(export[ \t]+)?interface[ \t]+([a-zA-Z0-9_$]+)/\2/i,interfaces/
--regex-typescript=/^[ \t]*(export[ \t]+)?type[ \t]+([a-zA-Z0-9_$]+)/\2/t,types/
--regex-typescript=/^[ \t]*(export[ \t]+)?enum[ \t]+([a-zA-Z0-9_$]+)/\2/e,enums/
--regex-typescript=/^[ \t]*import[ \t]+([a-zA-Z0-9_$]+)/\1/I,imports/

```

This should enable the spell check functionality. 
- To add a word to the dictionary: zg 
- To get a list of suggestions: z=
- To go to the previous spelling error: [s
- To go to the next spelling error: ]s
- To toggle spell check: F10.

To get the spell check to be active with markdown files only, create the file /home/david/.config/nvim/after/ftplugin/markdown.vim

```
setlocal spell
```


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


