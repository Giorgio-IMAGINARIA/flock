//Actions
import ActionCreatorSetApiAddress from '../actions/ActionCreatorSetApiAddress';
// Other libraries
import 'whatwg-fetch';
export default function() {
  let address = '/apiAddress';
  fetch(address, {method: 'GET'}).then((response) => {
    return response.json()
  }).then((json) => {
    ActionCreatorSetApiAddress(json.apiAddress);
  }).catch((ex) => {
    console.error('parsing failed', ex);
    return false;
  });
}
