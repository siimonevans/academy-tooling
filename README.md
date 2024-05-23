# Academy tooling

Lightweight webpack tooling for compiling SCSS and JS on the fly and generating development/production bundles.

This tooling requires node.js and npm. If you haven't already installed these dependencies previously, [here's a guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) on how to do so.

We strongly encourage you to use a version manager such as [nvm](https://github.com/nvm-sh/nvm) to manage node versioning.

## Add this tooling to your project

To get started, clone this repository into the root of your Picnic app.


### Using the correct node version

This tooling requires node 20. If you're using nvm, at the commandline and from the root of your project run:
```
nvm use
```

### Install dependencies

```bash!
npm install
```

## Running the tooling

Run the tooling in watch mode to compile front-end assets on the fly:
```
npm start
```
Compile a development build:
```
npm run build
```

Compile a minified production build:
```
npm run build:prod
```

## Integrating with your existing front-end assets

Now that we've installed the tooling, we need to integrate our existing front-end code to make use of it.

### Input and output directories

By default, the tooling compiles assets stored within `./static_src` and outputs them inside `./static_compiled`. 

Compiled CSS is available at `./static_compiled/css/main.css` and compiled JS at `./static_compiled/js/main.js`. 

Create new references in your base template to reflect both of these, for example:
```
<link rel="stylesheet" type="text/css" href='[static_path]/static_compiled/css/main.css'>
```

> Note: If you like, you can modify the entry and output paths in `webpack.config.js` to suit your project's architecture as necessary.

### Updating your existing front-end assets to work with the tooling

#### CSS

In your Picnic app you likely already have multiple `.css` files.

We need to update these to use the `.scss` extension and move them into the new tooling structure.

For example, an existing file named `my-component.css` should now be:

- Renamed to `my-component.scss`
- Moved to `./static_src/sass/`
- Imported via `main.scss` (`@import "my-component";`)

You can then remove any references to old CSS files in your HTML.

#### JavaScript

You also likely have some JavaScript which we can also move from its current location.

Add any existing scripts to `./static_src/js/main.js`, inside the `DOMContentLoaded` event listener. For improved organisation, you can create separate JS files for each component and import them in `main.js`.

You can then remove any inline scripts from their previous location.

