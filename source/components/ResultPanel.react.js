// @flow
// React
import React from 'react';
//Material UI
import Paper from 'material-ui/Paper';
// REDUX
import {connect} from "react-redux";

const mapStateToProps = state => {
  console.log('mensola: ', state);
  return {articles: state.articles};
};

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
//Stores
import StoreDroneList from '../stores/StoreDroneList';
// Style Modules
import GeneralStyle from '../styles/GeneralStyle';
import ResultStyle from '../styles/ResultStyle';

class ResultPanel extends React.Component {

  constructor() {
    super();
    this.onCurrentStoreDroneListChange = this.onCurrentStoreDroneListChange.bind(this);
    this.state = {
      droneArray: []
    };

  }

  onCurrentStoreDroneListChange() {
    let nextArray: Array<any> = StoreDroneList.getDroneArray();
    let droneList: Array<any> = [];
    nextArray.forEach((item, index) => {
      let elementToCreate: any = <TableRow key={index}>
        <TableRowColumn>{item.droneId}</TableRowColumn>
        <TableRowColumn>{item.name}</TableRowColumn>
        <TableRowColumn>{item.numCrashes}</TableRowColumn>
        <TableRowColumn>{item.numFlights}</TableRowColumn>
        <TableRowColumn>{item.price}</TableRowColumn>
        <TableRowColumn>{item.currency}</TableRowColumn>
      </TableRow>;
      droneList.push(elementToCreate);
    });
    this.setState({droneArray: droneList});
  }

  componentWillMount() {
    this.onCurrentStoreDroneListChange();
  }

  render() {
    console.log('article: ', this.props);

    return (<Paper style={ResultStyle.paperStyle} zDepth={2}>
      <div style={GeneralStyle.headerStyle}>
        <h1 style={GeneralStyle.mainTitle}>
          Result panel
        </h1>
        <h2 style={GeneralStyle.subTitle}>
          A visualisation of the drones filtered in the query panel
        </h2>
      </div>
      <ul className="list-group list-group-flush">
        {
          this.props.articles.map(el => {
            console.log('asdrob: ', el);
            return <li className="list-group-item" key={el.id}>
              {el.name}
            </li>
          })
        }
      </ul>
      <div style={GeneralStyle.paperContentWrapStyle}>
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Crashes</TableHeaderColumn>
              <TableHeaderColumn>Flights</TableHeaderColumn>
              <TableHeaderColumn>Price</TableHeaderColumn>
              <TableHeaderColumn>Currency</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.state.droneArray}
          </TableBody>
        </Table>
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

const ResultPanelToExport = connect(mapStateToProps)(ResultPanel);

export default ResultPanelToExport;
