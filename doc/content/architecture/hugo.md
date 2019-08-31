---
title: "Hugo"
date: 2019-08-31T17:12:02+01:00
weight: 50
---

The documentation is created using [Hugo](https://gohugo.io) with the theme [learn](https://learn.netlify.com/).

Installation of Hugo:
```
snap install hugo --channel=extended
hugo version
```

The documentation is written in the subdirectory of the project doc.
From the main project folder (tmymoney):
```
hugo new site doc
```

Then [install the theme](https://learn.netlify.com/en/basics/installation/):
```
cd doc
cd themes
hugo mod init https://github.com/matcornic/hugo-theme-learn.git
hugo mod get -u
git clone https://github.com/matcornic/hugo-theme-learn.git
```
{{% notice note %}}
**Some of the theme isn't stored by git, so after cloning the  project to another computer, you need to re-do the above step.**
{{% /notice %}}


The theme's [example site on Github](https://github.com/matcornic/hugo-theme-learn/tree/master/exampleSite), which is also the theme's documentation site, is a good place to look to see examples of how to use Hugo and the theme.

## Update scripts
There's a script to update just the documentation and host it on a localhost site using busybox. To check whether busybox is installed:
```
busybox
```

To install it:
```
sudo apt install busybox
```

The script is in the main project folder and is called ./hugo-update. After running it, you can view the output at http://localhost:4202.

## Hugo server
An even better way to make changes and then see the effect immediately is to use the [Hugo server](https://gohugo.io/commands/hugo_server/).

```
cd doc
hugo server
```

## Markdown

Hugo uses markdown. A simple guide is [here](https://www.markdownguide.org).

## Using Hugo [shortcodes](https://gohugo.io/content-management/shortcodes/)

Shortcodes containing parameters can be a bit tricky. Here are some examples. The examples contain a single curly bracket, to stop Hugo rendering them here, but to use them you need a double curly bracket.

 ```
{%param Date %}
{%param title %}
 ```
{{%param Date %}}  
{{%param title %}}

 ```
{%ref "/architecture/_index.md"%}
 ```
{{%ref "/architecture/_index.md"%}}

