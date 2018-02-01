// @flow
import AppDispatcher from '../dispatcher/AppDispatcher';
import EventEmitter from 'events';

const CHANGE_EVENT = 'change';

class StoreGithub extends EventEmitter {

  constructor() {
    super();
    this.githubArray = [];
    this.dispatchToken = AppDispatcher.register(this.handleAction.bind(this));
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getGithubArray() {
    return this.githubArray;
  }

  setGithubArray(parameter) {
    this.githubArray = parameter;
  }

  handleAction(Action) {
    if (Action.type === 'update_github_array') {
      this.setGithubArray(Action.parameter);
      this.emitChange();
    }
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

}

export default new StoreGithub();
