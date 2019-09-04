
### [nginx](http://nginx.org/)

Apparently this is pronounced 'engine-x' and is a web server.

To install it:
```
sudo apt install nginx
systemctl status nginx
sudo apt install lynx
lynx http://localhost
```

[Let's Encrypt](https://letsencrypt.org) provide an automated and free way of getting an SSL certificate so that you can have an https website. It's important to have an https site rather than a plain http site because with https everything is encrypted, including the url that the browser requests. With RESTful APIs, for security reasons the server needs to authenticate the requester, so as not to send private data to a complete stranger, and this means sending passwords or authentication tokens in the url. So to keep it private and secure, the url needs to be encrypted.

Let's Encrypt uses an automated method from [Certbot](https://certbot.eff.org). You can follow the instructions on their website. 

```
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository universe
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install certbot python-certbot-nginx
sudo certbot --nginx
lynx https://localhost
```

This didn't work completely smoothly for me the first time. I had to manually change the nginx configuration file and remove a lot of conflicting config. Basically I removed the config that came when I installed nginx and left just what the certbot put in.

```
sudo nano /etc/nginx/sites-enabled/default
sudo systemctl restart nginx
```

The /etc/nginx/sites-enabled/default ended up with

```
server {

	root /var/www/html;

	# Add index.php to the list if you are using PHP
	index index.html index.htm index.nginx-debian.html;
    server_name vm.davidgma.com; # managed by Certbot

	location / {
		# First attempt to serve request as file, then
		# as directory, then fall back to displaying a 404.
		try_files $uri $uri/ =404;
	}

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/vm.davidgma.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/vm.davidgma.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = vm.davidgma.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

	listen 80 ;
	listen [::]:80 ;
    server_name vm.davidgma.com;
    return 404; # managed by Certbot


}

```


