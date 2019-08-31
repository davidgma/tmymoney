The main documentation can be found at  https://davidgma.github.io/tmymoney/. 

I have been using KMyMoney to organise my finances for many years, I really like the program and I plan to continue using it. However, there are a few aspects of it that, for me, are lacking. The user interface doesn't cope well on smaller screens, there is no web interface, no mobile phone interface and no command line interface. Also it could perhaps be easier to input the sort of transactions that I input very regularly.  
Furthermore, I have become spoiled by the benefits provided by many web apps in that you can access then from any machine - laptop, tablet or phone - and from anywhere. I have moved my daily computing life almost entirely into the cloud. But KMyMoney remains stubbornly local as it only runs on a laptop and has no facilities to synchronise different versions that have been changed on different laptops. As a workaround I use a cloud file server mapped to a local directory so that I can at least access the same master file from different computers. This works pretty well, but I like programming in Typescript and so I thought I'd try to improve on this.  

TMyMoney aims to address some of these things. It runs in a terminal and provides a terminal interface and a web interface. It provides some of the existing functionality of KMyMoney and some additional functionality. It shares the same underlying KMyMoney file (.kmy file). There isn't any protection against both KMyMoney and TMyMoney using the file at the same time, so don't do this. But so long as you either use KMyMoney or TMyMoney at any particular time, and save the file, they should be able to coexist.

TMyMoney actually works by providing a REST API to both the terminal program and the web app, on http://localhost:someport.  
To access the web app through the internet, you can set up SSL and Google authentication on your web server (e.g. nginx) and then, once authenticated, have the web server forward calls to the localhost port.  You can also access the localhost port via SSH from another machine using port forwarding. This way, you can use the terminal interface or the web interface from another machine while only having one master KMyMoney file. 
