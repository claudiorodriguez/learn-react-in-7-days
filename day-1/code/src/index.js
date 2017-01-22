import React from 'react';
import {render} from 'react-dom';

const component = <div>Hello Worlds!</div>;

render(
  component,
  document.getElementById('render-app-here')
);
