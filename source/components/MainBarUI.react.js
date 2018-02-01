// @flow
// React
import React from 'react';
//React Modules
import LoginBlockUI from './LoginBlockUI.react';
import HelpContent from './HelpContent.react';
// materialUI
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import Menu from 'material-ui/svg-icons/navigation/menu';
import Help from 'material-ui/svg-icons/action/help-outline';

class MainBarUI extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.onLeftIconButtonTouchTap = this.onLeftIconButtonTouchTap.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.appBarStyle = {
      flexShrink: '0',
      position: 'fixed'
    };
    this.rightIconStyle = {
      margin: '0px',
      alignSelf: 'center'
    };
    this.menuItemStyle = {
      textDecoration: 'none !important'
    };
  }

  onLeftIconButtonTouchTap() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  render() {
    const actions = [< FlatButton label = "Dismiss" primary = {
        true
      }
      onTouchTap = {
        this.handleClose
      } />];
    return (
      <AppBar title="Flock-API Client" style={this.appBarStyle} iconElementLeft={< IconButton onTouchTap = {
        this.onLeftIconButtonTouchTap
      } tooltip="Help"
      tooltipPosition="bottom-right" > <Help/> < /IconButton>} iconElementRight={< LoginBlockUI />} iconStyleRight={this.rightIconStyle}>
        <Dialog title="Walkthrough" actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose} autoScrollBodyContent={true}>
        <HelpContent/>
        </Dialog>
      </AppBar>
    );
  }

}
export default MainBarUI;
