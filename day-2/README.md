# Day 2 - React components

This day's goal will be to dig a little deeper into what kind of components we can create, and how to use them.

You will need to have followed [Day 1](../day-1/README.md).

## Stateless components

The simplest form a component can take is a "stateless" component - consider it a simple function that
takes properties as an input, and returns a tree of components (or DOM nodes).

Let's go ahead and create one.

Create a new file at `src/components/Greeting/index.js` with these contents:

```
import React from 'react';

const Greeting = () => <div>Hello!</div>;

export default Greeting;
```

It's just a function that's always going to return a `div` element with the `Hello!` text inside.

Now let's go back to our `src/index.js` and make use of it... let's go ahead and make it fun - let's use it a couple times:

```
import React from 'react';
import {render} from 'react-dom';
import Greeting from './components/Greeting';

render(
  <div>
    <Greeting />
    <Greeting />
    <Greeting />
  </div>,
  document.getElementById('render-app-here')
);
```

Now, if you `npm run start` and open `localhost:8080`, you should see

```
Hello!
Hello!
Hello!
```

----------

This is all well and good, but what makes components really useful is being able to feed them `properties`.
Let's improve our `Greeting` component at `src/components/Greeting/index.js` so we can feed it a `name` to greet with:

```
import React, {PropTypes} from 'react';

const Greeting = ({name}) => <div>Hello {name}!</div>;

Greeting.propTypes = {
  name: PropTypes.string.isRequired
};

export default Greeting;
```

Alright, so what's going on here? First, let's take a look at the actual component declaration:

```
const Greeting = ({name}) => <div>Hello {name}!</div>;
```

A component declared as a function will receive an object with properties as the first argument.
We've decided the component will accept a `name` property, and we'll use it in its output.
Next, what's this about `propTypes` and `PropTypes`?

```
Greeting.propTypes = {
  name: PropTypes.string.isRequired
};
```

Here we're setting the `Greeting` component's `propTypes` - think of it as the list of properties that
the component will accept, and each of the property's data types, which will get checked and we'll get warnings
if something doesn't match. See [this page](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)
for more info. But for now, we've made it so that the `Greeting` component will accept a `name` property, which is a
`string`, and it's required.
In fact, save the file and check your browser - open up the console and you should see this warning:

```
Warning: Failed prop type: The prop `name` is marked as required in `Greeting`, but its value is `undefined`.
```

Pretty useful! Let's go back to `src/index.js` and make sure each instance of `Greeting` gets a `name`:

```
import React from 'react';
import {render} from 'react-dom';
import Greeting from './components/Greeting';

render(
  <div>
    <Greeting name='John' />
    <Greeting name='Cindy' />
    <Greeting name='Albert' />
  </div>,
  document.getElementById('render-app-here')
);
```

Now you should see this in your browser:

```
Hello John!
Hello Cindy!
Hello Albert!
```

But let's take a step further, and make our code prettier. Let's take another shot at `src/index.js`:

```
import React from 'react';
import {render} from 'react-dom';
import Greeting from './components/Greeting';

const names = ['John', 'Cindy', 'Albert'];

render(
  <div>
    {
      names.map(
        (name) =>
          <Greeting
            key={name}
            name={name}
          />
      )
    }
  </div>,
  document.getElementById('render-app-here')
);
```

The output should remain the same. You might be wondering what `key={index}` is all about.
When we're creating lists of elements in React, we need to provide a `key` property for each element. The value needs to
be unique for each of them. In this case, we'll just assume that we're not going to be greeting the same name each.
If we were dealing with, say, a `user` object that had an `id` property, we'd need to do something like

```
users.map(
  (user) =>
    <Greeting
      key={user.id}
      name={user.name}
    />
)
```

----------

TODO: Stateful components

TODO: Higher order components
