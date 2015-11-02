var React = require('react');
var Reqwest = require('reqwest');  //wraps cors requests
var BlabsView = require('../blabs/View.jsx')
var Menu = require('./Menu.jsx');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

module.exports = React.createClass({
  getDefaultProps: function() {
    return {origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''};
  },
  getInitialState: function() {
    return {showMenu: false};  //default is to hide
  },
  handleMenuClick: function() {
    this.setState({showMenu: !this.state.showMenu});  //toggle state
  },
  readFromAPI: function(url, successFunction) {
    Reqwest({
      url: url,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: successFunction,
      error: function(error) {
        console.error(url, error['response']);
        location = '/';
      }
    });
  },
  render: function() {
    //alternate class name on change of state
    var menu = this.state.showMenu ? 'show-menu' : 'hide-menu';

    //always render menu -- then use RouteHandler for rest of view -- pass down data setup
    return (
      <div id="app" className={menu}>
        <Menu sendMenuClick={this.handleMenuClick} />
        <div id="content">
          <RouteHandler origin={this.props.origin} readFromAPI ={this.readFromAPI } />
        </div>
      </div>
    );
  }
});
