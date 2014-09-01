/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({

  editMe: function(event) {
    this.props.setAttributes({
      txt: event.target.value
    })
  },

  editableTextarea: function() {
    var attributes = this.props.attributes || {};
    return <textarea onChange={this.editMe} value={attributes.txt}/>;
  },

  render: function() {
    return <div>{this.editableTextarea()}</div>;
  }
})
