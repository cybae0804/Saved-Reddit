import snoowrap from 'snoowrap';
import cred from 'configs/credentials';
import { observable, action } from 'mobx';
import qs from 'query-string';

class Reddit {
  constructor(rootStore) {
    this.rootStore = rootStore;

    this.authenticateAndLoadPosts();
  }

  @observable savedPosts = [
    // {
    //   id: 123,
    //   title: 'hello, 12345',
    //   link_title: 'whater',
    //   url: 'https://test.com',
    //   body: 'adslkfjlkzjcvklzcjxvlkjasdfoiajwefli',
    //   score: 12345,
    //   num_comments: 1234,
    //   subreddit_name_prefixed: 'r/todayIlearned',
    //   preview: {
    //     images: [
    //       {
    //         source: {
    //           url: 'https://external-preview.redd.it/aV7ayNgTuyjkD6CUwY-x0sKjQUMy1hb0jwCmoWQWUTY.jpg?auto=webp&s=7fe2c323a2d0ecfb106a89ef7726c6d94e838b8f',
    //         },
    //       },
    //     ],
    //   },
    // },
    // {
    //   id: 123,
    //   title: 'hello, 123',
    //   link_title: 'whater',
    //   url: 'https://test.com',
    //   body: 'adslkfjlkzjcvklzcjxvlkjasdfoiajwefli',
    //   score: 123,
    //   num_comments: 1234,
    //   subreddit_name_prefixed: 'r/todayIlearned',
    //   preview: {
    //     images: [
    //       {
    //         source: {
    //           url: 'https://external-preview.redd.it/aV7ayNgTuyjkD6CUwY-x0sKjQUMy1hb0jwCmoWQWUTY.jpg?auto=webp&s=7fe2c323a2d0ecfb106a89ef7726c6d94e838b8f',
    //         },
    //       },
    //     ],
    //   },
    // },
    // {
    //   id: 123,
    //   title: 'hello, 2345',
    //   link_title: 'whater',
    //   url: 'https://test.com',
    //   body: 'adslkfjlkzjcvklzcjxvlkjasdfoiajwefli',
    //   score: 2345,
    //   num_comments: 1234,
    //   subreddit_name_prefixed: 'r/todayIlearned',
    //   preview: {
    //     images: [
    //       {
    //         source: {
    //           url: 'https://external-preview.redd.it/aV7ayNgTuyjkD6CUwY-x0sKjQUMy1hb0jwCmoWQWUTY.jpg?auto=webp&s=7fe2c323a2d0ecfb106a89ef7726c6d94e838b8f',
    //         },
    //       },
    //     ],
    //   },
    // },
  ];

  @observable instance = null;

  @observable loading = false;

  @observable error = false;

  @action
  authenticateAndLoadPosts = async () => {
    this.loading = true;

    const { code } = qs.parse(window.location.search);
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');

    if (code) {
      await this.validateCode(code);
      window.history.replaceState({}, '', cred.redirectUri);
    } else if (refreshToken || accessToken) {
      await this.validateToken(refreshToken, accessToken);
    }

    if (this.instance) {
      localStorage.setItem('refreshToken', this.instance.refresh_token);
      localStorage.setItem('accessToken', this.instance.access_token);
      await this.getAllSavedContent();
    }

    this.loading = false;
  }

  @action
  validateCode = async (code) => {
    try {
      this.instance = await snoowrap.fromAuthCode({
        code,
        userAgent: cred.userAgent,
        clientId: cred.clientId,
        redirectUri: cred.redirectUri,
      });
    } catch (e) {
      console.error('error', e);
      this.error = e;
    }
  }

  @action
  validateToken = async (refreshToken, accessToken) => {
    try {
      // eslint-disable-next-line new-cap
      this.instance = await new snoowrap({
        refreshToken,
        accessToken,
        clientId: cred.clientId,
        userAgent: cred.userAgent,
      });
    } catch (e) {
      console.error('error', e);
      this.error = e;
    }
  }

  initiateOAuth = () => {
    const authUrl = snoowrap.getAuthUrl({
      clientId: cred.clientId,
      scope: ['history', 'identity', 'save'],
      redirectUri: cred.redirectUri,
    });

    window.location = authUrl;
  }

  @action
  getAllSavedContent = async () => {
    this.savedPosts = await this.instance.getMe().getSavedContent().fetchAll();
  }

  @action
  unsavePost = async (name) => {
    try {
      if (name.startsWith('t1_')) await this.instance.getComment(name).unsave();
      else if (name.startsWith('t3_')) await this.instance.getSubmission(name).unsave();
      this.savedPosts = this.savedPosts.filter((post) => post.name !== name);
    } catch (e) {
      console.error(e);
    }
  }
}

export default Reddit;
