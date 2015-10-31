var React = require('react');

module.exports = React.createClass({
  render: function () {
    //data is in prop.data passed from parent
    //foreach (map) blab in the dataset
    var blabs = this.props.data.map(function(blab) {
      return (
        <li>{blab.content}</li> //will be replaced with child
      );
    });  //end blabs declaration

    return (
      <div className="blabs-list">
        <ul>
            {blabs}
        </ul>
      </div>
    );  //end return


  }  //end render declaration
});
