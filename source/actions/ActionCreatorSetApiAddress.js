import AppDispatcher from '../dispatcher/AppDispatcher';

export default function(parameter) {

  let Action = {
    type: 'set_api_address',
    parameter: parameter
  };

  AppDispatcher.dispatch(Action);

}
