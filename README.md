# FOR DEVELOPMENT

1. Install Node.js and Yarn globally.
2. Clone the project in a location and be sure to have the rights to modify the files.
3. In the root directory of the project type "yarn" and wait for the packages to be built.
4. Type "yarn run web-watch" in a terminal and let it watch and dynamically build the project;
5. Open a different terminal, go to the "bin" directory in the project and type "node www".
6. Open a browser window and navigate to: "http://localhost:3001";
7. The API address to which to connect is in environment.js

# EXPLANATION

The application has a back-end written in Node.js and it uses Express.js as framework. The front-end is instead written in ES6, using React + Flux as framework, Flow as type-checking language, Radium as Javascript-CSS helper, Material-UI as UI library and transpiled with Webpack.

The relevant part of the backend is the apiAddress route that contains the path to use for the REST request to the Flock API. Having the address stored in that location makes changing the route easier for future updates. The address is retrieved at the apiAddress route when the app is started and it is stored in the StoreAddress to be used for the API requests.

The application is made of different components, the main ones are the QueryPanel and the ResultPanel.

The former contains the filters to apply to the GET request to the API, whereas the latter visualises the results as a dynamic table of drone details.

The request is done in the ActionCreatorSendToAPI by means of the AJAX library Fetch.
once done, the actionCreator dispatches an action that is listened by the StoreDroneList Store.

The store updates its status which is listened by the ResultPanel module. The module gets the next state of the Store and visualises the retrieved information as a table of contents.

If, anyway, the API reject the request and throws an error, that error is caught and dispatched to be listened by the StoreError. The changes in that store are then listened in the App module that visualises the issue through a SnackBar module.

The SnackBar used to show errors and the table aggregating drone details are provided by the Material UI library.

Focusing on the QueryPanel and then on the filters, it can be seen that the object to send to the ActionCreator and then used for the request to the API has the following interface:

interface DroneObject {
  droneID: any
}

The reason for the "any type is that the droneID could be  string or a number"

It's interesting to notice that not all characters are allowed in case the user choses to type the drone ID. A check is done on the text input to catch all invalid characters through the use of a Regular expression and then allow only strings representing integers:

isNumeric(str : string): boolean {
  return /^(0|[1-9][0-9]*)$/.test(str);
}

handleChangeIDText(evt, value) {
  if (this.isNumeric(value) || value === '')
    this.setState({IDTextFieldValueState: value});
  }

Most of the styles are contained in the "styles" directory. The new spread syntax is used to extend the single style objects as shown below:

let globalText = {
  color: '#ffffff'
}

let titles = {
  ...globalText,
  margin: '0',
  textIndent: '25px'
}

It can be seen also the use of the keywords let as variable declaration, the .foreach() method and the arrow functions:

nextArray.forEach((item, index) => {
  let elementToCreate: any =<TableRow key={index}>
    <TableRowColumn>{item.droneId}</TableRowColumn>
    <TableRowColumn>{item.name}</TableRowColumn>
    <TableRowColumn>{item.numCrashes}</TableRowColumn>
    <TableRowColumn>{item.numFlights}</TableRowColumn>
    <TableRowColumn>{item.price}</TableRowColumn>
    <TableRowColumn>{item.currency}</TableRowColumn>
  </TableRow>;
  droneList.push(elementToCreate);
});

In the code above it can be seen that the table is created dynamically as an array of nodes by giving a unique key to each of them.

In a different part of the code can also be seen the use of template literals:

let address = `${StoreAddress.getAddressRoot()}${route}`;

As for React, the way the elements are dynamically rendered on the screen requires the use of states:

this.state = {
  droneArray: []
};

That are set by the class logic:

this.setState({droneArray: droneList});

and then rendered:

<TableBody displayRowCheckbox={false}>
 {this.state.droneArray}
</TableBody>

# FUTURE IMPROVEMENTS

The style can be more refined with the use of initial mock-ups and can be improved to be more responsive.

Charts can be provided with a detail of the stats regarding the drones and obviously the initial filters can be made more useful by allowing the search through the different properties of the drones. The feature must be provides through a route by the API though.
