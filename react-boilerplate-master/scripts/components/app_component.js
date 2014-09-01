/** @jsx React.DOM */
var React = require('react');

var EditComponent = require('./edit_component');
var LearnComponent = require('./learn_component');

module.exports = React.createClass({

  getInitialState: function() {
    return {editable: false};
  },

  setAttributes: function (attributes) {
    this.props.player.setAttributes(attributes);
  },

  setLearnerState: function (learnerState) {
    this.props.player.setLearnerState(learnerState);
  },

  onAttributesChanged: function (attributes) {
    this.setState({attributes: attributes});
  },

  onLearnerStateChanged: function (learnerState) {
    this.setState({learnerState: learnerState});
  },

  onEditableChanged: function (data) {
    this.setState({editable: data.editable});
  },

  componentDidMount: function() {
    this.props.player.startListening();
    this.props.player.watchBodyHeight();
  },

  componentWillMount: function() {
    this.props.player.on('attributesChanged', this.onAttributesChanged.bind(this))
    this.props.player.on('learnerStateChanged', this.onLearnerStateChanged.bind(this))
    this.props.player.on('editableChanged', this.onEditableChanged.bind(this));
  },

  render: function() {
    if(this.state.editable) {
      return <EditComponent player={this.player} attributes={this.state.attributes} setAttributes={this.setAttributes}/>
    } else {
      return <LearnComponent
        player={this.player}
        attributes={this.state.attributes} learnerState={this.state.learnerState} setLearnerState={this.setLearnerState}/>
    }
  }
})
