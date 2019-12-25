import { observable, action } from 'mobx';

class UI {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable sortBy = null;

  @observable filterBy = null;

  @action
  setSortBy = () => {

  }

  @action
  setFilterBy = () => {

  }
}

export default UI;
