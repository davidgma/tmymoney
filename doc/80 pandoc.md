
### Pandoc

I wrote this documentation using [markdown](https://help.github.com/en/categories/writing-on-github) and then converted it to an html file and an ePUB ebook using [pandoc](https://pandoc.org).

```bash
sudo apt install pandoc
```

The script file doc_update in the project directory creates the files based on what is in the /docs subdirectory. The .md files in the /docs subdirectory should start with a number then a space where the numbers determine the order that the files will be bought into the final file. A table of contents is automatically generated. It renames all the files to resequence them from 10, increasing each by 10. This makes it easier to add new files in the middle of the old sequence.

The doc_update script is automatically called by the main git_update script to re-compile the documentation files before uploading them to Github Pages.

