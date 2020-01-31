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
          if (!post?.subreddit_name_prefixed?.toLowerCase()?.includes(this.searchBySubreddit)) return false;
        }

        if (this.searchByContent) {
          if (post?.title && post?.title?.toLowerCase()?.includes(this.searchByContent?.toLowerCase())) return true;
          if (post?.link_title && post?.link_title?.toLowerCase()?.includes(this.searchByContent?.toLowerCase())) return true;
          if (post?.body && post?.body?.toLowerCase()?.includes(this.searchByContent?.toLowerCase())) return true;
        }

        return true;
      })
      .sort((a, b) => {
        if (this.sortBy === 'Score') return b.score - a.score;
        return 0;
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
