/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {};
  },

  editMe: function(event) {
    this.setState({learnerTxt: event.target.value});
  },

  editableTextarea: function() {
    return <textarea onChange={this.editMe} value={this.state.learnerTxt}/>;
  },

  submitLearnerTxt: function() {
    this.props.setLearnerState({txtCorrect: this.verifyLearnerTxt()});
  },

  verifyLearnerTxt: function() {
    var attributes = this.props.attributes || {};
    return this.state.learnerTxt == attributes.txt;
  },

  render: function() {
    console.log(this.state);
    console.log(this.verifyLearnerTxt());
    return <div>
      {this.editableTextarea()}
      <input type="submit" onClick={this.submitLearnerTxt}/>
    </div>;
  }
})
