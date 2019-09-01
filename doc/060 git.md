
### Git
Git is needed for version control and for safely storing code on Github.

I used the Ubuntu packaged version of git.

```bash
sudo apt update
sudo apt install git
git --version
```

Usage examples:
```
git clone https://github.com/davidgma/tmymoney.git
cd tmymoney
npm install
git status
git add *
git commit -a -m "Initial sync."
git status
git remote rm origin
git remote add origin https://github.com/davidgma/tmymoney.git
git remote -v
git push origin master
git push --set-upstream origin master
git add *
git commit -a -m "Upload changes."
git push
ngh
```
