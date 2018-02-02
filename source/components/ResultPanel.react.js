// @flow
// React
import React from 'react';
//Material UI
import Paper from 'material-ui/Paper';

import {List, ListItem} from 'material-ui/List';
//Stores
import StoreDroneList from '../stores/StoreDroneList';
// Style Modules
import GeneralStyle from '../styles/GeneralStyle';
import ResultStyle from '../styles/ResultStyle';

class ResultPanel extends React.Component {

  constructor(props) {
    super(props);
    this.onCurrentStoreDroneListChange = this.onCurrentStoreDroneListChange.bind(this);

    this.state = {
      issueList: []
    };

  }

  onCurrentStoreDroneListChange() {
    let nextArray: Array<any> = StoreDroneList.getDroneArray();
    let listToRender: Array<any> = [];
    nextArray.forEach((item, index, array) => {
      let elementToCreate: any = <ListItem onMouseDown={this.openTab.bind(this, item.html_url)} innerDivStyle={ResultStyle.listItemStyle} key={index} primaryText={item.title}/>;
      listToRender.push(elementToCreate);
    });
    this.setState({issueList: listToRender});
  }

  openTab(url : string) {
    let win = window.open(url, '_blank');
    win.focus();
  }

  componentWillMount() {
    this.onCurrentStoreDroneListChange();
  }

  render() {
    return (<Paper style={ResultStyle.paperStyle} zDepth={2}>
      <div style={GeneralStyle.headerStyle}>
        <h1 style={GeneralStyle.mainTitle}>
          Result panel
        </h1>
        <h2 style={GeneralStyle.subTitle}>
          A visualisation of the drones filtered in the query panel
        </h2>
      </div>
      <div style={GeneralStyle.paperContentWrapStyle}>
        <List>
          {this.state.issueList}
        </List>
      </div>
    </Paper>);
  }

  componentDidMount() {
    StoreDroneList.addChangeListener(this.onCurrentStoreDroneListChange);
  }

  componentWillUnmount() {
    StoreDroneList.removeChangeListener(this.onCurrentStoreDroneListChange);
  }

}

export default ResultPanel;
