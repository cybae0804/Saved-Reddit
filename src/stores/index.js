import Reddit from './reddit';

class Store {
  constructor() {
    this.reddit = new Reddit(this);
  }
}

export default Store;
