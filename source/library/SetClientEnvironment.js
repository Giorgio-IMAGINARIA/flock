// Other libraries
import 'whatwg-fetch';

let ApiAddress = '';

const setApiAddress = (address) => {
  ApiAddress = address;
}

export const getApiAddress = () => {
  return ApiAddress
}

export default function() {
  let address = '/apiAddress';
  fetch(address, {method: 'GET'}).then((response) => {
    return response.json()
  }).then((json) => {
    setApiAddress(json.apiAddress);
  }).catch((ex) => {
    console.error('parsing failed', ex);
    return false;
  });
}
