import Reddit from './reddit';
import UI from './ui';

class Store {
  constructor() {
    this.reddit = new Reddit(this);
    this.ui = new UI(this);
  }
}

export default Store;
