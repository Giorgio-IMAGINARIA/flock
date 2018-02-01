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

import {List, ListItem} from 'material-ui/List';
//Stores
import StoreGithub from '../stores/StoreGithub';

class ResultPanel extends React.Component {

  constructor(props) {
    super(props);
    this.onCurrentStoreGithubChange = this.onCurrentStoreGithubChange.bind(this);

    this.state = {
      issueList: []
    };
    this.paperStyle = {
      textAlign: 'center',
      display: 'inline-block',
      width: 'calc(100% - 100px)',
      margin: '50px',
      backgroundColor: '#9575CD'
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

    this.paperContentWrapStyle = {
      display: 'flex',
      flexDirection: 'column',
      padding: '50px 25px 25px'
    };

    this.listItemStyle = {
      backgroundColor: '#ffffff',
      borderBottom: '1px dashed grey'
    };
  }

  onCurrentStoreGithubChange() {
    let nextArray: Array<any> = StoreGithub.getGithubArray();
    let listToRender: Array<any> = [];
    nextArray.forEach((item, index, array) => {
      let elementToCreate: any = <ListItem onMouseDown={this.openTab.bind(this, item.html_url)} innerDivStyle={this.listItemStyle} key={index} primaryText={item.title}/>;
      listToRender.push(elementToCreate);
    });
    this.setState({issueList: listToRender});
  }

  openTab(url : string) {
    let win = window.open(url, '_blank');
    win.focus();
  }

  componentWillMount() {
    this.onCurrentStoreGithubChange();
  }

  render() {
    return (<Paper style={this.paperStyle} zDepth={2}>
      <div style={this.headerStyle}>
        <h1 style={this.mainTitle}>
          Result panel
        </h1>
        <h2 style={this.subTitle}>
          A visualisation of the Github issues filtered in the query panel
        </h2>
      </div>
      <div style={this.paperContentWrapStyle}>
        <List>
          {this.state.issueList}
        </List>
      </div>
    </Paper>);
  }

  componentDidMount() {
    StoreGithub.addChangeListener(this.onCurrentStoreGithubChange);
  }

  componentWillUnmount() {
    StoreGithub.removeChangeListener(this.onCurrentStoreGithubChange);
  }

}

export default Radium(ResultPanel);
