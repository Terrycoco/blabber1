var React = require('react');
var BlabsList = require('./List.jsx')

module.exports = React.createClass({
  getInitialState: function() {
    return { data: [] };  //empty array to start
  },
  componentDidMount: function() {
    this.setState({ data:
      [
      {id: 2,
      content: "and another fake blab"},
      {id:1,
      content: "this is a fake blab"}
      ]
    });
  },
  render: function() {
    return (
      <div className="blabs-view">
        <BlabsList data={this.state.data}/>
      </div>
    );
  }

});
