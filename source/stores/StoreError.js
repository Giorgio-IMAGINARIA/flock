// @flow
import AppDispatcher from '../dispatcher/AppDispatcher';
import EventEmitter from 'events';

const CHANGE_EVENT = 'change';

class StoreError extends EventEmitter {

  constructor() {
    super();
    this.droneArray = [];
    this.dispatchToken = AppDispatcher.register(this.handleAction.bind(this));
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getDroneArray() {
    return this.droneArray;
  }

  setDroneArray(parameter) {
    this.droneArray = parameter;
  }

  handleAction(Action) {
    if (Action.type === 'update_drone_array') {
      this.setDroneArray(Action.parameter);
      this.emitChange();
    }
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

}

export default new StoreError();
