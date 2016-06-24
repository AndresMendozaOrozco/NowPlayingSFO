# NowPlayingSanFrancisco

The main purpose of this test is to evaluate your skills as a Front End Developer, get to know a little bit more of the code you write and how you can approach challenges.

## THE #NOWPLAYING PAGE
The #NowPlaying page is a simple one-page app where visitors can visualize the most recent videos being shared on Twitter by people nearby. 

### Version
1.0

### Web Application Folder Structure
	/nowplayingsfoapp1
		index.html
		/css
			npsfo.css
			bootstrap.min.css
			1-col-portfolio.css
		/js
			testembedpost.js
			myutilities.js
			widgets.js
			bootstrap.min.js
			jquery.js
		/php
			postTweet.php
			twitterconnect.php
			youtubetitle.php
			
			* These next folders and files are part of the TwitterOAuth module; then deploying under Linux, please remove and install TwitterOAuth. For Windows deploymetn you can use these as explained later:
			composer.json
			composer.lock
			/vendor
		/resources
			/img
				tweet.png

### Tech

NowPlayingSFO uses a number of open source projects to work properly:

* [Apache 2.4.17] - The Apache HTTP Server Project is an effort to develop and maintain an open-source HTTP server for modern operating systems including UNIX and Windows. The goal of this project is to provide a secure, efficient and extensible server that provides HTTP services in sync with the current HTTP standards. https://httpd.apache.org/download.cgi
* [php 5.6.16] - PHP is a server-side scripting language designed for web development but also used as a general-purpose programming language. http://php.net/downloads.php
* [TWITTEROAUTH] - anages authentication to Twitter API and subsequent requests; its referenced by the Twitter development team! https://github.com/abraham/twitteroauth
* [Composer] - Composer is a tool for dependency management in PHP. It allows you to declare the libraries your project depends on and it will manage (install/update) them for you. https://getcomposer.org/download/
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [jQuery] - Simplifies javascript

And of course NowPlayingSFO itself is open source with a [https://github.com/AndresMendozaOrozco/NowPlayingSFO]
 on GitHub.

 
### Platform prerequesites
Composer https://getcomposer.org/download/:
```sh
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('SHA384', 'composer-setup.php') === 'bf16ac69bd8b807bc6e4499b28968ee87456e29a3894767b60c2d4dafa3d10d045ffef2aeb2e78827fa5f024fbe93ca2') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
```

TwitterOAuth: https://twitteroauth.com/
Go to tht php folder inside the application and tun:
```sh
$ composer require abraham/twitteroauth
```

Note: this installations are not required with the windows bundled application delivered; TwitterOAuth is embedded in the #NowPlayingSanFrancisco application folder. This is just a reference for deployments under other OS.

### Installation

NowPlayingSFO requires a web application server with php includded; for the Apache Server and the php interpreter, I recommend installing the XAMPP or WAMPServer stack (Windows or Linux): 
- https://www.apachefriends.org/download.html
- http://www.wampserver.com/en/.

The Application should be deployed under the server, i.e. find the application folder of your installation.
e.g. For WAMPServer, generally is located in: 
```sh
C:\wamp64\www\
```

Copy the #NowPlayingSanFrancisco application folder to the WAMPServer Applications deployments:
```sh
C:\wamp64\www\nowplayingsfoapp1
```

Start the Application server and use your browser to access; e.g. http://localhost/nowplayingsfoapp1


