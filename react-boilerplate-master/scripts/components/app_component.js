/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {editable: false};
  },

  setAttributes: function (attributes) {
    console.log("setAttributes", attributes);
    this.props.player.setAttributes(attributes);
  },

  setLearnerState: function (learnerState) {
    this.props.player.setLearnerState(this.state.learnerState);
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
    this.props.challengesApi = new VersalChallengesAPI( function() {
      console.log("created challengesApi")
    })

  },

  editMe: function(wot, event) {
    var data;
    if (this.state.attributes && this.state.attributes.data) {
      data = this.state.attributes.data;  
    } else {
      console.log("initData");
      data = {};
    }

    data[wot] = event.target.value;
    // this.state.player.txt[idx] = event.target.value;
    this.setAttributes({
      data: data
    })
  },

  getText: function(idx) {
    // debugger;
    if (this.state.attributes && this.state.attributes.data) {
      res = this.state.attributes.data[idx];
    } else {
      return "----"
    }
   
  },

  setChallenges: function(answer) {
    blob = [
      {
          prompt: 'What is the color of the sky?',
          answers: 'blue',
          scoring: 'strict'
      }
    ];
    this.props.challengesApi.setChallenges(blob);
  },

  render: function() {
    // this.state.txt = "edit me";

    // if {this.state.editable}
    //   return <div>"editing"</div>
    // else
      return <div>
        <div>
          {this.state.editable ? "edit" : "play"}
        </div>
        <textarea 
          onChange={this.editMe.bind(this, "f1")} 
          value={ this.getText("f1") }
        />
        <textarea 
          onChange={this.editMe.bind(this, "f2")}
          value={ this.getText("f2") }
        />

    </div>

  }
})
