# Mikestumpf.com #


## Description ##


* This is my personal site


## Software Architecture (High Level) ##


* This webapp is built on [Node.js](https://nodejs.org/en/) with a [Handlebars](http://handlebarsjs.com/) templating engine and [Sass](http://sass-lang.com/).  It relies on [Redis](https://redis.io/) for caching content and external API calls and on [Foreman](https://github.com/strongloop/node-foreman) for managing the config values and running the application.


## Technical Requirements ##


* Node.js 6.3.1
* Sass ~3.4.22
* JavaScript ES6
* NPM ~3.10.3 
* Ruby ~2.3.1
* Upstart


## How to set up a local environment ##

NPM and Bower install project dependencies (only needed once).  Grunt builds the frontend CSS and JS files

After cloning the repo:
```
gem install foreman sass
cp .env_example .env
npm install
npm install foreman grunt-cli bower nodemon -g
bower install
grunt build
```


## How to run the project for development after setup ##

Nodemon is used in Procfile_dev so that any changes to the Node.js code are automatically applied and the app is restarted
```
foreman start -f Procfile_dev
```
The site is served at [http://localhost:3000](http://localhost:3000)


## How to develop the frontend JS and CSS files ##

[Grunt](http://gruntjs.com/) monitors changes and recompiles the build files as needed.  [Live Reload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) can be used for automated page refreshes once the builds are complete
```
grunt dev
```


## How to run the project for production ##

[Upstart](http://upstart.ubuntu.com/) is used to daemonize the webapp and keep it alive.  Foreman exports the config values to the appropriate files for use by Upstart.
```
npm run export
sudo start foreman
```
The site is served at [http://localhost:3000](http://localhost:3000)