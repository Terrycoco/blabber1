//require css files here
require('./assets/app.css');
require('./assets/blabs.css');

//components
var React = require('react');
var App = require('./components/layout/App.jsx')

React.render(<App/>, document.body);
