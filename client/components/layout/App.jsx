var React = require('react');
var Reqwest = require('reqwest');  //wraps cors requests
var BlabsView = require('../blabs/View.jsx')
var Menu = require('./Menu.jsx');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Uri = require('jsuri');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''};
  },

  getInitialState: function() {
    return {showMenu: false, signedIn: false, currentUser: {handle:''}};  //defaults
  },

  //fires BEFORE INITIAL RENDER
  componentWillMount: function() {
    //if jwt is in url then store it
    var jwt = new Uri(location.search).getQueryParamValue('jwt');
    if (!!jwt) {sessionStorage.setItem('jwt', jwt);}
  },

  //fires AFTER WILL MOUNT
  componentDidMount: function() {
    //if jwt is stored then call api function below
    if(!!sessionStorage.getItem('jwt')) {this.currentUserFromAPI();}
  },

  currentUserFromAPI: function() {
    //make call to /current_user -> run callback with user returned
    this.readFromAPI(this.props.origin + '/current_user', function(user) {
      //set signedIn and currentUser values in state
      this.setState({signedIn: true, currentUser: user});
    }.bind(this));
  },

   //set the request headers
  readFromAPI: function(url, successFunction) {
    Reqwest({
      url: url,
      headers: {'Authorization': sessionStorage.getItem('jwt')},
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
  handleMenuClick: function() {
    this.setState({showMenu: !this.state.showMenu});  //toggle state
  },


  render: function() {
    //alternate class name on change of state
    var menu = this.state.showMenu ? 'show-menu' : 'hide-menu';

    //always render menu -- then use RouteHandler for rest of view -- pass down data setup
    return (
      <div id="app" className={menu}>
        <Menu origin={this.props.origin} sendMenuClick={this.handleMenuClick} signedIn={this.state.signedIn } />
        <div id="content">
          <RouteHandler origin={this.props.origin} readFromAPI ={this.readFromAPI } signedIn={this.state.signedIn} />
        </div>
      </div>
    );
  }
});
