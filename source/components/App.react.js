// @flow
//React
import React from 'react';
// REACT-REDUX
import {connect} from "react-redux";
// REDUX ACTIONS
import {changeSnackbar} from "../actions/changeSnackbar";
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
    changeSnackbar: (snackBarState) => dispatch(changeSnackbar(snackBarState))
  };
};

class App extends React.Component {
  constructor() {
    super();
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleRequestClose() {
    this.props.changeSnackbar({
      snackBarOpenState: {
        openState: false
      },
      errorMessage: {
        message: ''
      }
    });
  }

  render() {
    return (<MuiThemeProvider muiTheme={getMuiTheme()}>
      <div style={AppRootStyle.mainWrap}>
        <div style={AppRootStyle.appWrap}>
          <MainBarUI/>
          <div style={AppRootStyle.topSpaceStyle}/>
          <QueryPanel/>
          <ResultPanel/>
          <Snackbar bodyStyle={AppRootStyle.snackBarStyle} open={this.props.snackBarOpenState.openState} message={this.props.errorMessage.message} autoHideDuration={1000} onRequestClose={this.handleRequestClose}/>
        </div>
      </div>
    </MuiThemeProvider>);
  }
}

const AppToExport = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppToExport;
