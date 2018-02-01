// @flow
//React
import React from 'react';
import {StyleRoot} from 'radium';
//Material UI Modules
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//React Modules
import MainBarUI from '../components/MainBarUI.react';
import QueryPanel from './QueryPanel.react';
import ResultPanel from './ResultPanel.react';

class App extends React.Component {
  constructor(props) {
    super(props);
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
  }

  render() {
    return (<StyleRoot style={this.mainWrap}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div style={this.appWrap}>
          <MainBarUI/>
          <div style={this.topSpaceStyle}/>
            <QueryPanel/>
            <ResultPanel/>
        </div>
      </MuiThemeProvider>
    </StyleRoot>);
  }
}
export default App;
