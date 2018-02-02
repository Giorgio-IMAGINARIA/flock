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
// Style Modules
import AppRootStyle from '../styles/AppRootStyle';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onCurrentStoreErrorChange = this.onCurrentStoreErrorChange.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.state = {
      open: false,
      message: ''
    };
  }

  onCurrentStoreErrorChange() {
    let errormessage: string = StoreError.getErrorMessage();
    this.setState({open: true, message: errormessage});
  }

  handleRequestClose() {
    this.setState({open: false, message: ''});
  }

  render() {
    return (<StyleRoot style={AppRootStyle.mainWrap}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div style={AppRootStyle.appWrap}>
          <MainBarUI/>
          <div style={AppRootStyle.topSpaceStyle}/>
          <QueryPanel/>
          <ResultPanel/>
          <Snackbar bodyStyle={AppRootStyle.snackBarStyle} open={this.state.open} message={this.state.message} autoHideDuration={4000} onRequestClose={this.handleRequestClose}/>
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
