
### [nginx](https://nginx.org/)

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
##
# You should look at the following URL's in order to grasp a solid understanding
# of Nginx configuration files in order to fully unleash the power of Nginx.
# https://www.nginx.com/resources/wiki/start/
# https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/
# https://wiki.debian.org/Nginx/DirectoryStructure
#
# In most cases, administrators will remove this file from sites-enabled/ and
# leave it as reference inside of sites-available where it will continue to be
# updated by the nginx packaging team.
#
# This file will automatically load configuration files provided by other
# applications, such as Drupal or Wordpress. These applications will be made
# available underneath a path with that package name, such as /drupal8.
#
# Please see /usr/share/doc/nginx-doc/examples/ for more detailed examples.
##


server {

	# SSL configuration

	# root /var/www/html;

	# Add index.php to the list if you are using PHP
	index index.html index.htm index.nginx-debian.html;
    server_name vm.davidgma.com; # managed by Certbot


	location / {
		proxy_pass http://localhost:4210;
		# First attempt to serve request as file, then
		# as directory, then fall back to displaying a 404.
		# try_files $uri $uri/ =404;
	}

	# pass PHP scripts to FastCGI server
	#
	#location ~ \.php$ {
	#	include snippets/fastcgi-php.conf;
	#
	#	# With php-fpm (or other unix sockets):
	#	fastcgi_pass unix:/var/run/php/php7.0-fpm.sock;
	#	# With php-cgi (or other tcp sockets):
	#	fastcgi_pass 127.0.0.1:9000;
	#}

	# deny access to .htaccess files, if Apache's document root
	# concurs with nginx's one
	#
	#location ~ /\.ht {
	#	deny all;
	#}


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

server {

	location / {
		proxy_pass http://localhost:4211/;
	}
	
	listen 80 ;
	listen [::]:80 ;
	server_name localhost;
}


```


