// @flow
// React
import React from 'react'
//Material UI Modules
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import {deepOrange300, purple500} from 'material-ui/styles/colors';
const style = {
  margin: 5
};

class LoginBlockUI extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.logoutUser = this.logoutUser.bind(this);
    this.accountNameStyle = {
      color: '#ffffff'
    }
  }

  logoutUser() {
    console.log('logout!!!');
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({open: true, anchorEl: event.currentTarget});
  }

  handleRequestClose = () => {
    this.setState({open: false});
  }

  render() {
    return (<div>
      <FlatButton labelStyle={this.accountNameStyle} onTouchTap={this.handleTouchTap} label={"Giorgio Mazzei"} labelPosition="before" icon={<Avatar color={deepOrange300} backgroundColor={purple500} size={30} style={style}>{'GM'}</Avatar>}/>
      <Popover open={this.state.open} anchorEl={this.state.anchorEl} anchorOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }} targetOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }} onRequestClose={this.handleRequestClose}>
        <Menu>
          <MenuItem primaryText="Sign out" onTouchTap={this.logoutUser}/>
        </Menu>
      </Popover>
    </div>);
  }
}

export default LoginBlockUI;
