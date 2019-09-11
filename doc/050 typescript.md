
### Typescript

I used [Typescript](https://www.typescriptlang.org).

```bash
npm install -g typescript
```

To create a new Typescript/Node project in a sub-folder called tmymoney within the tmymoney project:

```
cd tmymoney
mkdir tmymoney
cd tmymoney
npm init
tsc --init
npm install --save @types/node
```

Amend the tsconfig.json with:
```
"outDir": "../dist-tmymoney",

```


A useful place to look for other types (for other npm packages you may want to use) is [Microsoft's TypeSearch page](https://microsoft.github.io/TypeSearch/).



