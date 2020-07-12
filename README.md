# Electron Timer

Building a small cross-plataform desktop with electron, html, javascript and css.

  - Electron
  - HTML
  - CSS
  - Javascript

### Installation

You need to install [Electron](https://www.electronjs.org/) first of all.
Electron timer requires [Node.js](https://nodejs.org/) v4+ and [npm](https://www.npmjs.com/) to run.

Install the dependencies with command below.

```sh
$ cd Electron-timer
$ npm install
```

For production environments install [Electron-packager](https://www.npmjs.com/package/electron-packager)

```sh
$ npm install electron-packager -g
```

and build ...

```sh
$ electron-packager <app directory> <app name> --platform=darwin,linux,win32 --arch=x64 --icon=<your icons path (ico,icns,png)>
```

### Development

Open your favorite Terminal and run these commands:

```sh
$ cd Electron-timer
$ npm install
$ npm start
```

**and you will see the magic!!!!**