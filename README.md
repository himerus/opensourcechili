### OpenSourceChili.com

#### Development process
##### Checkout Repo
* `git clone git@github.com:himerus/himerus.git`
* `cd himerus`

##### Install System Dependencies
> Ensure `Node.js` is installed

* `node -v` - Should be >= `9.4.0`

> Install `Node.js` from scratch

* Download from [nodejs.org](https://nodejs.org/en/) 

> Ensure `npm` is installed

*  `npm -v` - Should be >= `5.8.0`

> Update `npm` to latest

* `npm i -g npm`

##### Install Project Dependencies
> When running the following command, all npm dependencies are downloaded locally to the `node_modules` directory. 
* `npm install`
  
##### Run Project
> The following npm script enables a variety of things including compiling and watching JS changes with Webpack, compiling and watching SCSS changes with node-sass, running the webpack-dev-server to view the local site, as well as running tests on files when changed files are saved and running autoprefixer on compiled CSS to add browser prefixes for compatibility with older browsers for modern CSS. 
* `npm start`

##### Other Commands
> Run npm scripts enables all sorts of features including: local server, JS compilation with webpack & babel and watch scss files for changes
* `test` - Run all tests.
* `test:stylelint` - Run all SCSS tests.
* `test:eslint` - Run all JS tests.
* `chili:webpack:watch` - Run webpack and watch for changes.
* `chili:webpack:build` - Run webpack to build changes. (once)
* `chili:watch` - Run both webpack and scss watches.
* `chili:build` - Run both webpack and scss builds.
* `chili:server` - Run local development server. (webpack-dev-server)
* `chili:clean:core` - Clean out the /dist directory before running builds.
* `chili:scss:build:core` - Run SCSS compilation. (once)
* `chili:scss:watch:core` - Run SCSS compilation and watch for additional changes.
* `chili:scss:stylelint:core` - Run SCSS stylelint on primary package.
* `chili:eslint:core` - Run JS eslint on primary package.
* `chili:scss:autoprefixer:core` - Run autoprefixer on compiled CSS for browser compatibility.

#### Resources
* https://nodejs.org/en/
* https://www.npmjs.com/
* https://webpack.js.org/
* https://babeljs.io/
* https://sass-lang.com/
* https://eslint.org/
* https://stylelint.io/
* https://autoprefixer.github.io/
* http://postcss.org/
