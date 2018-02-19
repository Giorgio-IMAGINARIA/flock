// @flow
// React
import React from 'react';
// REACT-REDUX
import {connect} from "react-redux";
//Material UI
import Paper from 'material-ui/Paper';

const mapStateToProps = state => {
  return {droneArray: state.droneArray};
};

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

// Style Modules
import GeneralStyle from '../styles/GeneralStyle';
import ResultStyle from '../styles/ResultStyle';

class ResultPanel extends React.Component {

  constructor() {
    super();
  }

  render() {



    console.log('this.props.droneArray: ', this.props.droneArray);



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
            {
              this.props.droneArray.map((item, index) => <TableRow key={index}>
                  <TableRowColumn>{item.droneId}</TableRowColumn>
                  <TableRowColumn>{item.name}</TableRowColumn>
                  <TableRowColumn>{item.numCrashes}</TableRowColumn>
                  <TableRowColumn>{item.numFlights}</TableRowColumn>
                  <TableRowColumn>{item.price}</TableRowColumn>
                  <TableRowColumn>{item.currency}</TableRowColumn>
                </TableRow>)
            }
          </TableBody>
        </Table>
      </div>
    </Paper>);
  }
}

const ResultPanelToExport = connect(mapStateToProps)(ResultPanel);

export default ResultPanelToExport;
