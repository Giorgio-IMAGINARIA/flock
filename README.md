# FOR DEVELOPMENT

1. Install Node.js and Yarn globally.
2. Clone the project in a location and be sure to have the rights to modify the files.
3. In the root directory of the project type "yarn" and wait for the packages to be built.
4. Type "yarn run web-watch" in a terminal and let it watch and dinamically build the project;
5. Open a different terminal, go to the "bin" directory in the project and type "node www".
6. Open a browser window and navigate to: "http://localhost:3001";
7. The API address to which to connect is in environment.js

# EXPLANATION

The application has a backend written in Node.js and using Express.js as framework. The frontend is instead written in ES6, using React + Flux as framework, Flow as type-checking language, Radium as Javascript-CSS helper, Material-UI as UI library and transpiled with Webpack.

The relevant part of the backend is the apiAddress route that contains the path to use for the REST request to the Github API. Having that there makes changing the route easier for future updates.

The application is made of different components, the main ones are the QueryPanel and the ResultPanel.

The former contains the filters to apply to the GET request to the API, whereas the latter visualises the results as a dynamic list of clickable issues.

The request is done in the ActionCreatorSentToGithub by using the AJAX library Fetch.
once done, the actioncreator dispatches an action that is listened by the StoreGithub Store.

The store updates its status which is listened by the ResultPanel module. The module gets the next state of the Store and visualises part of the retrieved information as a list of issues.

Focusing on the QueryPanel and then on the filters, it can be seen that the object to send to the ActionCreator and then used for the request to the API has the following interface:

interface GithubObject {
  milestone: any,
  state: string,
  assignee: string,
  creator?: string,
  mentioned?: string,
  labels?: string,
  sort: string,
  since?: string
}

which makes some properties not mandatory.

The style section uses the new spread syntax as the following example shows:

this.titles = {
  ...this.globaltext,
  margin: '0',
  textIndent: '25px'
};

It can be seen also the use of the keywords let and const as variable declaration, the .map() and .foreach() methods and the arrow functions again belonging to the ES6 realm:

let chipDataArray: Array<any> = this.state.chipData;

const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);

stringsArray.forEach((item, index, array) => {
  labelsToSend = labelsToSend + item.label;
  if (index !== array.length - 1) {
    labelsToSend = labelsToSend + ','
  };
});

As well as the use of template literals:

let timeToReturn: string = `${year}-${month}-${date}T${hour}:${minute}:${secondsValueToConvert}Z`;

The following statement uses the Object.keys(obj) method to return an array of keys from the JSON object passed and then the forEach() method to loop through that. The append method of url.searchParams appends those keys and their values to the URL created with the address retrieved from the related store that is then used by Fetch for the GET request:

let url = new URL(address),
  params = objectToSubmit;
Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

As for React, the way the elements are dynamically rendered on the screen requires the use of states:

this.state = {
  issueList: []
};

That are set by the class logic:

this.setState({issueList: listToRender});

and then rendered:

<List>
  {this.state.issueList}
</List>

# FUTURE IMPROVEMENTS

The logic can be much more DRY, also the different filters can be split in different components, that would require the use of different action-creators and stores, but would make the whole app more reusable. also some components would be very similar and they could be composed so that changes to the parent class would reverberate towards the children.
