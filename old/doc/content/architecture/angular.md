---
title: "Angular"
date: 2019-08-31T12:36:47+01:00
weight: 10
---

I used [Angular](https://angular.io)] for the web client. Angular produces static web sites - a web site where all the code is served once by the web server and then doesn't need to be served again for the entire running of the web app by the user, unless the user refreshes the web page. The advantage of this is that it's cheaper to serve and a lot of companies now offer free serving of static websites, such as Github with Github Pages. Plus, cloud file servers such as Google Drive and pCloud let you run a static web site just by putting the files into a folder on the cloud and making it public or selecting an option to publish.

There is a back end that the web client uses but this is via RESTful API calls.

```
npm install -g @angular/cli
```