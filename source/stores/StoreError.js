// @flow
import AppDispatcher from '../dispatcher/AppDispatcher';
import EventEmitter from 'events';

const CHANGE_EVENT = 'change';

class StoreError extends EventEmitter {

  constructor() {
    super();
    this.errormessage = '';
    this.dispatchToken = AppDispatcher.register(this.handleAction.bind(this));
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getErrorMessage() {
    return this.errormessage;
  }

  setErrorMessage(parameter) {
    this.errormessage = parameter;
  }

  handleAction(Action) {
    if (Action.type === 'api_error') {
      this.setErrorMessage(Action.parameter);
      this.emitChange();
    }
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

}

export default new StoreError();
