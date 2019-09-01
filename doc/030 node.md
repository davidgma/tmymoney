
### Node

I installed Node using the [Node Version Manager](https://github.com/nvm-sh/nvm).

You can install it with apt too but this doesn't give such a recent version.
After installing it per the instructions I installed the latest LTS version of Node.

```bash
bash
command -v nvm
nvm ls-remote
nvm install --lts
node --version
which node
which npm
```

The which commands should give paths that are under the directory ~/.nvm rather than under /usr.