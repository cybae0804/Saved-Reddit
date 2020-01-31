import { observable, action, computed } from 'mobx';

class UI {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable sortBy = 'Recent';

  @observable searchByContent = null;

  @observable searchBySubreddit = null;

  @computed get resultingPosts() {
    return this.rootStore.reddit.savedPosts
      .filter((post) => {
        if (this.searchBySubreddit) {
          if (!post.subreddit_name_prefixed.includes(this.searchBySubreddit)) return false;
        }

        if (this.searchByContent) {
          if (
            !post.title.includes(this.searchByContent)
            || !post.link_title.includes(this.searchByContent)
            || !post.body.includes(this.searchByContent)
          ) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (this.sortBy === 'Recent') return 0;
        if (this.sortBy === 'Score') return b.score - a.score;
      });
  }

  @action
  setSortBy = (type) => {
    this.sortBy = type;
  }

  @action
  setSearchByContent = (searchString) => {
    this.searchByContent = searchString;
  }

  @action
  setSearchBySubreddit = (searchString) => {
    this.searchBySubreddit = searchString;
  }

  @action
  reset = () => {
    this.sortBy = 'Recent';
    this.searchByContent = null;
    this.searchBySubreddit = null;
  }
}

export default UI;
