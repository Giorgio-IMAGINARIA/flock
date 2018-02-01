// @flow
// React
import React from 'react';
//Action Creators
import ActionCreatorSendToGithub from '../actions/ActionCreatorSendToGithub';
//Material UI
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RightArrow from 'material-ui/svg-icons/navigation/chevron-right';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
// Style Modules
import GeneralStyle from '../styles/GeneralStyle';
import QueryStyle from '../styles/QueryStyle';

interface DroneObject {
  milestone: any
}

class QueryPanel extends React.Component {

  constructor(props) {
    super(props);

    this.handleChangeMilestoneText = this.handleChangeMilestoneText.bind(this);
    this.handleMilestoneChange = this.handleMilestoneChange.bind(this);
    this.validateDetails = this.validateDetails.bind(this);

    this.milestoneStringValue = '*';

    this.state = {
      milestoneInputDisabled: true,
      milestoneIntegerValue: ''
    };

  }

  handleMilestoneChange(evt : any, value : string): void {
    if (value === 'number') {
      this.setState({milestoneInputDisabled: false});
      this.milestoneStringValue = null;
    } else {
      this.setState({milestoneInputDisabled: true, milestoneIntegerValue: ''});

      switch (value) {
        case 'all':
          {
            this.milestoneStringValue = '*'
          }
          break;
        case 'none':
          {
            this.milestoneStringValue = value
          }
          break;
      };
    };
  }

  returnAbsIntValue(value : string): number {
    return Math.abs(parseInt(value));
  }

  handleChangeMilestoneText(evt, value) {
    this.returnAbsIntValue(value)
      ? this.setState({milestoneIntegerValue: this.returnAbsIntValue(value)})
      : this.setState({milestoneIntegerValue: ''});
  }

  validateDetails() {
    let milestoneDisabled: boolean = this.state.milestoneInputDisabled;
    let milestoneValueToSend: any;
    if (milestoneDisabled) {
      milestoneValueToSend = this.milestoneStringValue;
    } else {
      this.state.milestoneIntegerValue
        ? milestoneValueToSend = this.state.milestoneIntegerValue
        : milestoneValueToSend = '*';
    };

    let objectToSend: DroneObject = {
      milestone: milestoneValueToSend
    }
    ActionCreatorSendToGithub(objectToSend);
  }

  render() {
    return (<Paper style={QueryStyle.paperStyle} zDepth={2}>

      <div style={GeneralStyle.headerStyle}>
        <h1 style={GeneralStyle.mainTitle}>
          Query panel
        </h1>
        <h2 style={GeneralStyle.subTitle}>
          Select "All" to get data related to all drones or type the drone id for a specific drone, then submit your query
        </h2>
      </div>

      <div style={GeneralStyle.paperContentWrapStyle}>

        <div style={QueryStyle.inputBoxStyle}>
          <div style={QueryStyle.inputBoxTitleRowStyle}>
            <h3 style={QueryStyle.internalTitleStyle}>
              Drone filter
            </h3>
          </div>
          <div style={QueryStyle.doubleRowStyle}>
            <div style={QueryStyle.doubleRowInternalLeftWrapStyle}>
              <RadioButtonGroup name='milestoneSelection' defaultSelected="all" onChange={this.handleMilestoneChange}>
                <RadioButton labelStyle={GeneralStyle.globalText} iconStyle={QueryStyle.radioIconStyle} value="all" label="All" style={QueryStyle.radioButtonSpacedStyle}/>
                <RadioButton labelStyle={GeneralStyle.globalText} iconStyle={QueryStyle.radioIconStyle} value="number" label="ID" style={QueryStyle.radioButtonSpacedStyle}/>
                <RadioButton labelStyle={GeneralStyle.globalText} iconStyle={QueryStyle.radioIconStyle} value="none" label="None"/>
              </RadioButtonGroup>
            </div>
            <div style={QueryStyle.doubleRowInternalRightWrapStyle}>
              <TextField disabled={this.state.milestoneInputDisabled} inputStyle={GeneralStyle.globalText} value={this.state.milestoneIntegerValue} fullWidth={true} hintText="Type the drone ID" floatingLabelText="Drone ID" floatingLabelStyle={GeneralStyle.globalText} underlineFocusStyle={QueryStyle.underlineFocusStyle} type="number" onChange={this.handleChangeMilestoneText}/>
            </div>
          </div>
        </div>

        <div style={QueryStyle.submitRowStyle}>
          <div>
            <FloatingActionButton mini={true} secondary={true} onMouseDown={this.validateDetails}>
              <RightArrow/>
            </FloatingActionButton>
          </div>
        </div>

      </div>

    </Paper>);
  }
}

export default QueryPanel;
