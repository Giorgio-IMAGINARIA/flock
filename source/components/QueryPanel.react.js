// @flow
// React
import React from 'react';
// REACT-REDUX
import {connect} from "react-redux";
// REDUX STORE
import ReduxStore from '../store/index';
// REDUX ACTIONS
import {addArticle} from "../actions/index";

const mapDispatchToProps = dispatch => {
  return {
    addArticle: article => dispatch(addArticle(article))
  };
};


//Action Creators
import ActionCreatorSendToAPI from '../actions/ActionCreatorSendToAPI';
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
  droneID: any
}

class QueryPanel extends React.Component {

  constructor() {
    super();

    this.handleChangeIDText = this.handleChangeIDText.bind(this);
    this.IDRadioGroupChange = this.IDRadioGroupChange.bind(this);
    this.validateDetails = this.validateDetails.bind(this);
    this.onCurrentReduxStoreChange = this.onCurrentReduxStoreChange.bind(this);

    this.state = {
      IDInputDisabledState: true,
      IDTextFieldValueState: ''
    };

  }

  onCurrentReduxStoreChange() {
    console.log('Redux store state: ', ReduxStore.getState());
  }

  IDRadioGroupChange(evt : any, value : string): void {
    value === 'number'
      ? this.setState({IDInputDisabledState: false})
      : this.setState({IDInputDisabledState: true, IDTextFieldValueState: ''});
  }

  isNumeric(str : string): boolean {
    return /^(0|[1-9][0-9]*)$/.test(str);
  }

  handleChangeIDText(evt, value) {
    if (this.isNumeric(value) || value === '')
      this.setState({IDTextFieldValueState: value});
    }

  validateDetails() {
    // ReduxStore.dispatch(addArticle({name: 'React Redux Tutorial for Beginners', id: 1}));
    console.log('this.props', this.props);
    this.props.addArticle({ name: 'React Redux Tutorial for Beginners', id: 1 });

    let objectToSend: DroneObject = {
      droneID: this.state.IDTextFieldValueState
        ? parseInt(this.state.IDTextFieldValueState)
        : '*'
    };
    ActionCreatorSendToAPI(objectToSend);
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
              <RadioButtonGroup name='milestoneSelection' defaultSelected="all" onChange={this.IDRadioGroupChange}>
                <RadioButton labelStyle={GeneralStyle.globalText} iconStyle={QueryStyle.radioIconStyle} value="all" label="All" style={QueryStyle.radioButtonSpacedStyle}/>
                <RadioButton labelStyle={GeneralStyle.globalText} iconStyle={QueryStyle.radioIconStyle} value="number" label="ID" style={QueryStyle.radioButtonSpacedStyle}/>
              </RadioButtonGroup>
            </div>
            <div style={QueryStyle.doubleRowInternalRightWrapStyle}>
              <TextField disabled={this.state.IDInputDisabledState} inputStyle={GeneralStyle.globalText} value={this.state.IDTextFieldValueState} fullWidth={true} hintText="Type the drone ID" floatingLabelText="Drone ID" floatingLabelStyle={GeneralStyle.globalText} underlineFocusStyle={QueryStyle.underlineFocusStyle} type="text" onChange={this.handleChangeIDText}/>
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

  componentDidMount() {
    ReduxStore.subscribe(this.onCurrentReduxStoreChange);
  }

  componentWillUnmount() {
    ReduxStore.unsubscribe(this.onCurrentReduxStoreChange);
  }
}

const QueryPanelToExport = connect(null, mapDispatchToProps)(QueryPanel);

export default QueryPanelToExport;
