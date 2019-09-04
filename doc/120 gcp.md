
### Google Cloud Platform

Google Cloud Platform generously gives you a small but useful virtual machine for [free under the 'Compute Engine' brand name](https://cloud.google.com/free/). I don't know why they call it Compute Engine; Google Virtual Machines would have been a lot less confusing. For free you can get an 'f1 micro instance' with 1 virtual processor 0.6 GB ram and a 30 GB hard drive. It's not much but it's free indefinitely and a lot better than a slap in the face with a wet fish. 

#### Register with Google Cloud Platform

Setting up the VM in the first place is covered by various quickstarts and tutorials that are listed under the [compute engine documentation](https://cloud.google.com/compute/docs). 

First I signed up for the free 12 month trial with $300 dollars spending money for free. I only plan to use the free tier for the time being, but having the additional $300 (£244.01) is handy because then, if accidentally you've configured something that you get charged for, you can see it in the [billing section](https://cloud.google.com/resource-manager/docs/creating-managing-projects) and work out what you've done wrong before they relieve you of any real hard-earned money.

#### Create a project

Then you have to [create a project](https://cloud.google.com/resource-manager/docs/creating-managing-projects). I don't know why, it's just the way they've set things up - all resources seem to sit within a project. Because I planned to have the main billed VM (it's free but in theory billed because if I increased the size above the free tier then they would bill me) inside the project I called it Main Billed with a project ID of main-billed. You won't be able to call yours exactly the same thing because project IDs are unique across all of GCP. They will suggest a project name by default but it's usually rather long. You might want to try to find something shorter. Also, sometimes they choose a project name for you made up of 2 random words that have nothing to do with your project at all. This reminds me of Compuserve, an old online service that pre-dated the web, where they would choose a password for you made up of 2 random words joined together with a hyphen as far as I remember. But someone once complained because they gave him the password wooden-penis. I don't know why he complained, he can't have had much of a sense of humour. I imagine that Google take more care with the allowed words list. 

#### Create the vm

Then you set up the new VM from: GCP, console, compute engine, having made sure that you are in the right project (selected at the top). You can mostly follow the instructions and choose the defaults except that:
- you need to make sure that your choices match up with what the free offering covers (e.g. an f1-micro in a US region)
- the default suggests a 10 GB 'standard persistent disk' but you can get a 30 GB drive one for free so you should change that
- you need to tick the checkboxes to allow http and https traffic. See the note about firewalls below.
- I installed Ubuntu rather than Debian although I have no objection to Debian, I'm just more used to Ubuntu.

#### Get a static ip address

Then you need to request a static ip address as you are going to get a domain name and link it to that address. To do this, go to: GCP, console, compute engine, view network details (menu to right of instance listing), external ip addresses. If the type is listed an ephemeral or dynamic and has the option to change it there to static then do so. Otherwise click on 'reserve static address' above and set it to static or get another address that's static.


#### Note on firewalls for the VM

Google compute engine has its own firewall around the VM which is configured as part of the GCP console and so any firewall settings need to be made via this rather than via a firewall inside the VM itself. So ufw, for example, on Ubuntu remains inactive.

SSH will automatically be set up to be allowed as part of the process of setting up the VM. To configure SSL (https) using Let's Encrypt, you need http to be active for the automated certificate routine to work, so even if you only plan to use https on your server going forward, you still need to initially allow http and https until you've successfully set up SSL and then you can remove the http again from the firewall if you wish.

To configure the firewall, once the VM has been set up, it's GCP, console, compute engine, view network details (menu to right of instance listing), firewall rules.