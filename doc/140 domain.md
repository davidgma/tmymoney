
### Getting a domain name

To access your website via https you're going to need a domain name. These have a charge - currently at least £10 a year. I used [Google Domains](https://domains.google) for this.

#### Register a domain

First select 'register a domain' on Google Domains site and follow the instructions. Once you've chosen and paid for a domain then you can go to the 'my domains' section and see your domain.

#### Set up DNS

To have your domain name forward to the right place (your vm on GCP) you need to tell Google Domains what you want. You can have the same domain forward to different places entirely depending on the subdomain. For example, my domain is davidgma.com. I want vm.davidgma.com to go to my GCP vm and chess.davidgma.com to go to my Chess Opening Trainer web app that is hosted on Github Pages.

In Google Domains, choose DNS from the menu, and then go down to 'Custom resource records' at the bottom of the page.

For the vm subdomain, create an A record with vm as the name and the static ip address from your vm as the ipv4 address.

For the chess subdomain, create a CNAME record with chess as the name and your Github subdomain as the address. In my case, I put in davidgma.github.io. as the address. The web app is actually at https://davidgma.github.io/chess-opening-trainer/ but you can't put the whole thing into the CNAME record, just the subdomain. You then have to tell Github what to do with the request by going into the Github repository, settings, GitHub Pages, and then under 'Custom domain' put the subdomain from the DNS CNAME record, in my case chess.davidgma.com. Don't tick the checkbox for 'Enforce HTTPS' yet because it takes Github up to 24 hours to set it up. Once it's set up, then tick the checkbox. 

Now, going to https://chess.davidgma.com/ will go to the Github pages web app and https://vm.davidgma.com will go to the GCP VM.