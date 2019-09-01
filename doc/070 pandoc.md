
### Pandoc

I wrote this documentation using [markdown](https://help.github.com/en/categories/writing-on-github) and then converted it to an html file and an ePUB ebook using [pandoc](https://pandoc.org).

The version of pandoc that comes with Ubuntu is very old and doesn't seem to work properly. I downloaded the latest version from [pandoc](https://pandoc.org/installing.html). I clicked on 'Download latest installer' and then found the .deb at the bottom of the page. Then I installed it with the QApt Package Installer.


The script file doc_update in the project directory creates the files based on what is in the /docs subdirectory. The .md files in the /docs subdirectory should start with a number then a space where the numbers determine the order that the files will be bought into the final file. Actually, any alphabetical order will do - the script will add on the numbering. A table of contents is automatically generated. It renames all the files to resequence them from 10, increasing each by 10. This makes it easier to add new files in the middle of the old sequence.

The doc_update script is automatically called by the main git_update script to re-compile the documentation files before uploading them to Github Pages.

