# FOR DEVELOPMENT

1. Install Node.js and Yarn globally.
2. Clone the project in a location and be sure to have the rights to modify the files.
3. In the root directory of the project type "yarn" and wait for the packages to be built.
4. Type "yarn run web-watch" in a terminal and let it watch and dynamically build the project;
5. Open a different terminal, go to the "bin" directory in the project and type "node www".
6. Open a browser window and navigate to: "http://localhost:3001";
7. The API address to which to connect is in environment.js


# INITIAL ASSUMPTIONS

The initial assumptions were that the time was limited and that 2 main features to implement were showing details for all drones and handling the API errors gracefully. The app should have been designed to handle a big amount of data and to be as much modular as I could, to be more manageable by me or other developers in the future.

Other considerations were oriented towards a language as ECMAScript that is widespread and well supported by now and a framework as React that is very svelte for these kind of projects.

React is a UI library that used in collaboration with other libraries helps creating a framework-like ecosystem which is an ideal tool for MVC-like applications.

Also the code base can be easily implemented in React Native and used for the creation of mobile applications.     


# COMPROMISES

I tried to create a modular future-proof app with modules that deal with different concerns, but I could have done more that way. For instance the SnackBar showing errors could have been contained in a separated module instead of being directly used in the APP module.

Not all the style objects are confined in the "styles" directory, plus the styles themselves could be improved to provide more responsiveness beyond what the Material UI library already does out of the box.

The errors could be handled better, for instance by repeating the operation requested to the API for a certain amount of times without disclosing the error to the client. After that a message should be anyway provided as well as a choice for the user to reset the query.

The filter panel could have been more modular to host more filter sub-panels for future improvements of the API.

Going on developing the app without thinking at these initial compromises and addressing them could lead to an increasing amount of time spent for the code maintenance and for the implementation of further features.  


# GENERAL EXPLANATION

The application has a back-end written in Node.js and it uses Express.js as framework. The front-end is instead written in ES6, using React + Redux as framework, Flow as type-checking language, Material-UI as UI library and transpiled with Webpack.

The relevant part of the backend is the apiAddress route that contains the path to use for the REST request to the Flock API. Having the address stored in that location makes changing the route easier for future updates. The address is retrieved at the apiAddress route when the app is started and it is stored in SetClientEnvironment.js to be used for the API requests.

The application is made of different components, the main ones are the QueryPanel and the ResultPanel.

The former contains the filters to apply to the GET request to the API, whereas the latter visualises the results as a dynamic table of drone details.

The request is done in the fetchDrones action by means of the AJAX library Fetch.
once done, the new state is dispatched to the reducer.

The state is listened by the ResultPanel module. The module gets the props through "connect" and visualises the retrieved information as a table of contents.

If, anyway, the API reject the request and throws an error, that error is caught and dispatched again to the reducer. The App module visualises the issue through a SnackBar module.

The SnackBar used to show errors and the table aggregating drone details are provided by the Material UI library.

Focusing on the QueryPanel and then on the filters, it can be seen that the object to send to the fetchDrones action and then used for the request to the API has the following interface:

interface DroneObject {
  droneID: any
}

The reason for the "any" type is that the droneID could be  string or a number.

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

It can be seen also the use of the keywords let as variable declaration, the .map() method and the arrow functions:

this.props.droneArray.map((item, index) => <TableRow key={index}>
    <TableRowColumn>{item.droneId}</TableRowColumn>
    <TableRowColumn>{item.name}</TableRowColumn>
    <TableRowColumn>{item.numCrashes}</TableRowColumn>
    <TableRowColumn>{item.numFlights}</TableRowColumn>
    <TableRowColumn>{item.price}</TableRowColumn>
    <TableRowColumn>{item.currency}</TableRowColumn>
  </TableRow>)

In the code above it can be seen that the table is created dynamically as an array of nodes by giving a unique key to each of them.

In a different part of the code can also be seen the use of template literals:

let address = `${getApiAddress()}${route}`;

As for React, the way the elements are dynamically rendered on the screen requires the use of states:

this.state = {
  IDInputDisabledState: true,
  IDTextFieldValueState: ''
};

That are set by the class logic:

this.setState({IDTextFieldValueState: value});

and then rendered:

value={this.state.IDTextFieldValueState}

The app is ready to be deployed to the Google Cloud Platform after the inclusion of the app.yaml file (the app modules are built in Yarn which guarantees consistency for new installations).


# FUTURE IMPROVEMENTS

The style can be more refined with the use of initial mock-ups and can be improved to be more responsive.

Charts can be provided with a detail of the stats regarding the drones and obviously the initial filters can be made more useful by allowing the search through the different properties of the drones. The feature must be provides through a route by the API though.
