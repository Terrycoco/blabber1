//require css files here
require('./assets/app.css');
require('./assets/blabs.css');

//react and routers
var React = require('react');
var Router = require('react-router');
var routes = require('./config/routes.jsx');

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.body);
});
