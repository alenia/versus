/** @jsx React.DOM */
var React = require('react');

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

  isAuthor: function() {
    return <div>{this.state.editable ? "author" : "learn"}</div>;
  },

  editMe: function(event) {
    this.setAttributes({
      txt: event.target.value
    })
  },

  editableTextarea: function() {
    var attributes = this.state.attributes || {};
    return <textarea onChange={this.editMe} value={attributes.txt}/>
  },

  render: function() {
    return <div>{this.isAuthor()}{this.editableTextarea()}</div>;
  }
})
