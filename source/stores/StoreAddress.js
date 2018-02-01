// @flow
import AppDispatcher from '../dispatcher/AppDispatcher';
import EventEmitter from 'events';

const CHANGE_EVENT = 'change';

class StoreAddress extends EventEmitter {

  constructor() {
    super();
    this.addressRoot = null;
    this.dispatchToken = AppDispatcher.register(this.handleAction.bind(this));
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getAddressRoot() {
    return this.addressRoot;
  }

  setAddressRoot(parameter) {
    this.addressRoot = parameter;
  }

  handleAction(Action) {
    if (Action.type === 'set_api_address') {
      this.setAddressRoot(Action.parameter);
      this.emitChange();
    }
  }

   emitChange() {
    this.emit(CHANGE_EVENT);
  }

}

export default new StoreAddress();
