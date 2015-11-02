var React = require('react');
var Router = require('react-router');
var App = require('../components/layout/App.jsx');
var BlabsView = require('../components/blabs/View.jsx');
var AboutView = require('../static/AboutView.jsx');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

module.exports = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="blabs" handler={BlabsView} />
    <Route name="about" handler={AboutView} />
  </Route>

);

//this is what react-router does:
//app is assigned at root level
//blabsView is assigned default route -- so it is rendered at parent which is /
//aboutView is assigned a route so it is rendered at /about
