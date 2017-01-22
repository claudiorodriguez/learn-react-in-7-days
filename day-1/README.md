# Day 1

## Barest of bones, Node + React

Start by opening a terminal window, creating a folder somewhere, and getting into it.

Now, let's create a new package in this folder:
```
> npm init
```

Just press `<enter>` on every prompt, don't worry, we can change things later.
Now we should have a `package.json` file in our folder. We are now ready to start installing packages.
Let's start with React.

```
> npm install --save react@15 react-dom@15
```
(That `@x` is just to ensure you install that major version of the package, which was used at the time of writing this guide)

Create a `src` folder and a file called `index.js` in it, with these contents:

```
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const component = React.createElement('div', null, 'Hello World!');
const componentAsString = ReactDOMServer.renderToString(component);

console.log(componentAsString);
```

Now run `node src/index.js` - you should get something like this:
```
<div data-reactroot="" data-reactid="1" data-react-checksum="1309021079">Hello World!</div>
```

Neat! We rendered a React component into a string, but...

- We used CommonJS modules, instead of ES6 modules
- We used `React.createElement` when we could have declared `component` as `<div>Hello World!</div>`
- We used `ReactDOMServer` which, as its name suggests, is meant for server-side rendering

## Transpiling with Babel

First, let's worry about the first two items.
Now, unless you're reading this in the future, node isn't going to understand either ES6 modules, or `const component = <div>...</div>`, which is JSX - basically a form of syntactic sugar which gets transformed into `React.createElement` calls.
For this, we need [Babel][babel] to transpile for us. Let's install it, and the presets (pre-packaged sets of babel plugins) we'll need.

```
> npm install --save-dev babel-cli babel-core babel-preset-es2015 babel-preset-react
```

We'll need to set up Babel. Create a file called `.babelrc` with these contents:
```
{ "presets": ["es2015", "react"] }
```
That's it. We're just telling it to use the two presets we just installed.
Now let's change `src/index.js` a bit to reflect our newly found powers:

```
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const component = <div>Hello World!</div>;
const componentAsString = ReactDOMServer.renderToString(component);

console.log(componentAsString);
```

And run this command:
```
> ./node_modules/.bin/babel src -d dist
```
We basically just told Babel to take the `index.js` file (which we won't be able to run with `node`), and output a transpiled form of it in the `dist` folder. So, now we run:
```
> node dist/index.js
```
And we should be getting pretty much the same output as the last time!
```
<div data-reactroot="" data-reactid="1" data-react-checksum="1309021079">Hello World!</div>
```

## Building with Webpack

But we're still doing server-side rendering, and we want this to run on a browser.
Babel isn't enough - if you read the contents of `dist/index.js`, you'll see it transformed the `import` calls into `require` calls, and that's not going to work - browsers don't quite yet have package management as a feature.

That's where [webpack][] comes in - basically, it will take our `src/index.js`, add in the modules we import in it, and output a bundled JS file which can then be used on a browser.

Let's start by installing `webpack`, and `webpack-dev-server`, which will help us run an http server on `localhost` to easily test our bundle.

```
> npm install --save-dev webpack@2 webpack-dev-server@2 babel-loader
```

Now, create a file called `webpack.config.babel.js` with these contents:

```
import path from 'path';

export default {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: 'demo/',
    inline: true,
    watchContentBase: true
  },
  entry: [
    './src/index'
  ],
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loaders: ['babel-loader'],
        test: /\.js$/
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/'
  }
};
```

Don't worry too much about it for now - just keep in mind we're putting in our entry file as `src/index.js`, passing `*.js` files through the `babel-loader`, and putting out our output on `/dist/bundle.js`.
Before we can run `webpack-dev-server`, however, we'll need to make two changes.

First, we'll create `demo/index.html`:

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Dev Server</title>
</head>
<body>
  <div id="render-app-here"></div>
  <script src="dist/bundle.js"></script>
</body>
</html>
```

Nothing crazy, just load up our bundled output, and have a `div` element on which we can render our app.
Now, we change our server-rendering `src/index.js` to render on a browser environment:

```
import React from 'react';
import {render} from 'react-dom';

const component = <div>Hello World!</div>;

render(
  component,
  document.getElementById('render-app-here')
);
```

That's it. Now we're ready to run `webpack-dev-server`:
```
> ./node_modules/.bin/webpack-dev-server --config ./webpack.config.babel.js
```
We should get some output about the bundle, along with:
```
Project is running at http://localhost:8080/
```

All that remains is opening that URL in our browser, and hopefully we'll see `Hello World!`.
Try changing the component in `src/index.js`, say, have it be `Hello Worlds!` instead, and you'll notice the browser will reload automatically. This is default `webpack-dev-server` behaviour. Eventually, we'll get into hot-reloading, but for now, we have successfully created a working (if barebones) dev environment with React.

Next day, we'll try and expand our application into something prettier and more interactive.

[babel]: https://babeljs.io
[webpack]: https://webpack.github.io
