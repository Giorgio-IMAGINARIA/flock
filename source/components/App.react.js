// @flow
//React
import React from 'react';
import {StyleRoot} from 'radium';
//Material UI Modules
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
//React Modules
import MainBarUI from '../components/MainBarUI.react';
import QueryPanel from './QueryPanel.react';
import ResultPanel from './ResultPanel.react';
//Stores
import StoreError from '../stores/StoreError';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onCurrentStoreErrorChange = this.onCurrentStoreErrorChange.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.state = {
      open: false,
      message: ''
    };
    this.mainWrap = {
      width: '100%',
      height: 'inherit',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };
    this.appWrap = {
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      width: 'inherit',
      height: 'inherit'
    };
    this.topSpaceStyle = {
      width: '100%',
      height: '64px'
    }
    this.snackBarStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }

  onCurrentStoreErrorChange() {
    let errormessage: string = StoreError.getErrorMessage();
    this.setState({open: true, message: errormessage});
  }

  handleRequestClose() {
    this.setState({open: false, message: ''});
  }

  render() {
    return (<StyleRoot style={this.mainWrap}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div style={this.appWrap}>
          <MainBarUI/>
          <div style={this.topSpaceStyle}/>
          <QueryPanel/>
          <ResultPanel/>
          <Snackbar bodyStyle={this.snackBarStyle} open={this.state.open} message={this.state.message} autoHideDuration={4000} onRequestClose={this.handleRequestClose}/>
        </div>
      </MuiThemeProvider>
    </StyleRoot>);
  }
  componentDidMount() {
    StoreError.addChangeListener(this.onCurrentStoreErrorChange);
  }

  componentWillUnmount() {
    StoreError.removeChangeListener(this.onCurrentStoreErrorChange);
  }
}
export default App;
