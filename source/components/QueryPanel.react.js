// @flow
// React
import React from 'react';
// Radium
import Radium from 'radium';
let Style = Radium.Style;
//Action Creators
import ActionCreatorSendToGithub from '../actions/ActionCreatorSendToGithub';
//Material UI
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RightArrow from 'material-ui/svg-icons/navigation/chevron-right';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

interface GithubObject {
  milestone: any
}

class QueryPanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleChangeMilestoneText = this.handleChangeMilestoneText.bind(this);
    this.handleMilestoneChange = this.handleMilestoneChange.bind(this);
    this.validateDetails = this.validateDetails.bind(this);

    this.state = {
      milestoneInputDisabled: true,
      milestoneIntegerValue: '',
    };

    this.paperStyle = {
      textAlign: 'center',
      display: 'inline-block',
      width: 'calc(100% - 100px)',
      margin: '50px',
      backgroundColor: '#7986CB'
    };
    this.headerStyle = {
      width: '100%',
      height: '50px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-around'

    };
    this.globaltext = {
      color: '#ffffff'
    }
    this.titles = {
      ...this.globaltext,
      margin: '0',
      textIndent: '25px'
    };
    this.mainTitle = {
      ...this.titles,
      fontSize: '12pt'
    };
    this.subTitle = {
      ...this.titles,
      fontSize: '9pt',
      fontWeight: '100'
    };
    this.internalTitleStyle = {
      ...this.titles,
      fontSize: '10pt',
      fontWeight: '200'
    };

    this.paperContentWrapStyle = {
      display: 'flex',
      flexDirection: 'column',
      padding: '50px 25px 25px'
    };

    this.inputBoxStyle = {
      border: '1px solid #ffffff',
      marginBottom: '25px'
    };

    this.inputBoxTitleRowStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: '20px',
      borderBottom: '1px solid #ffffff'
    };

    this.inputInternalRowStyle = {
      padding: '25px'
    };

    this.doubleRowStyle = {
      ...this.inputInternalRowStyle,
      display: 'flex'
    };

    this.doubleRowInternalWrapStyle = {
      display: 'flex',
      alignItems: 'space-between',
      width: '50%'
    };
    this.doubleRowInternalLeftWrapStyle = {
      ...this.doubleRowInternalWrapStyle,
      justifyContent: 'space-between'
    };
    this.doubleRowInternalRightWrapStyle = {
      ...this.doubleRowInternalWrapStyle,
      justifyContent: 'center'
    };

    this.radioButtonSpacedStyle = {
      marginBottom: '16px'
    };

    this.radioLabelStyle = {
      color: '#ffffff'
    }

    this.radioIconStyle = {
      fill: '#ffffff'
    }

    this.textInputStyle = {
      color: '#ffffff'
    }

    this.panelRowStyle = {
      width: '100%',
      display: 'flex',
      alignItems: 'center'
    };

    this.submitRowStyle = {
      ...this.panelRowStyle,
      height: '50px',
      justifyContent: 'center'
    };

    this.floatingLabelStyle = {
      color: '#ffffff'
    };
    this.underlineFocusStyle = {
      borderColor: '#FC4482'
    };

    this.milestoneStringValue = '*';
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




    let objectToSend: GithubObject = {
      milestone: milestoneValueToSend
    }
    ActionCreatorSendToGithub(objectToSend);
  }

  render() {
    return (<Paper style={this.paperStyle} zDepth={2}>

      <div style={this.headerStyle}>
        <h1 style={this.mainTitle}>
          Query panel
        </h1>
        <h2 style={this.subTitle}>
          Select "All" to get data related to all drones or type the drone id for a specific drone, then submit your query
        </h2>
      </div>

      <div style={this.paperContentWrapStyle}>

        <div style={this.inputBoxStyle}>
          <div style={this.inputBoxTitleRowStyle}>
            <h3 style={this.internalTitleStyle}>
              Drone filter
            </h3>
          </div>
          <div style={this.doubleRowStyle}>
            <div style={this.doubleRowInternalLeftWrapStyle}>
              <RadioButtonGroup name='milestoneSelection' defaultSelected="all" onChange={this.handleMilestoneChange}>
                <RadioButton labelStyle={this.radioLabelStyle} iconStyle={this.radioIconStyle} value="all" label="All" style={this.radioButtonSpacedStyle}/>
                <RadioButton labelStyle={this.radioLabelStyle} iconStyle={this.radioIconStyle} value="number" label="ID" style={this.radioButtonSpacedStyle}/>
                <RadioButton labelStyle={this.radioLabelStyle} iconStyle={this.radioIconStyle} value="none" label="None"/>
              </RadioButtonGroup>
            </div>
            <div style={this.doubleRowInternalRightWrapStyle}>
              <TextField disabled={this.state.milestoneInputDisabled} inputStyle={this.textInputStyle} value={this.state.milestoneIntegerValue} fullWidth={true} hintText="Type the drone ID" floatingLabelText="Drone ID" floatingLabelStyle={this.floatingLabelStyle} underlineFocusStyle={this.underlineFocusStyle} type="number" onChange={this.handleChangeMilestoneText}/>
            </div>
          </div>
        </div>

        <div style={this.submitRowStyle}>
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

export default Radium(QueryPanel);
