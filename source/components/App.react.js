// @flow
//React
import React from 'react';
// REACT-REDUX
import {connect} from "react-redux";
// REDUX ACTIONS
import {closeSnackbar} from "../actions/closeSnackbar";
// RADIUM
import {StyleRoot} from 'radium';
//Material UI Modules
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
//React Modules
import MainBarUI from '../components/MainBarUI.react';
import QueryPanel from './QueryPanel.react';
import ResultPanel from './ResultPanel.react';
// Style Modules
import AppRootStyle from '../styles/AppRootStyle';

const mapStateToProps = state => {
  return {errorMessage: state.errorMessage, snackBarOpenState: state.snackBarOpenState};
};

const mapDispatchToProps = dispatch => {
  return {
    closeSnackbar: () => dispatch(closeSnackbar())
  };
};

class App extends React.Component {
  constructor() {
    super();
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleRequestClose() {
    this.props.closeSnackbar();
  }

  render() {
    return (<StyleRoot style={AppRootStyle.mainWrap}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div style={AppRootStyle.appWrap}>
          <MainBarUI/>
          <div style={AppRootStyle.topSpaceStyle}/>
          <QueryPanel/>
          <ResultPanel/>
          <Snackbar bodyStyle={AppRootStyle.snackBarStyle} open={this.props.snackBarOpenState} message={this.props.errorMessage} autoHideDuration={4000} onRequestClose={this.handleRequestClose}/>
        </div>
      </MuiThemeProvider>
    </StyleRoot>);
  }
}

const AppToExport = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppToExport;
