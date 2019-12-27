import snoowrap from 'snoowrap';
import cred from 'configs/credentials';
import { observable, action } from 'mobx';
import qs from 'query-string';

class Reddit {
  constructor(rootStore) {
    this.rootStore = rootStore;

    this.authenticateAndLoadPosts();
  }

  @observable savedPosts = [];

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
      scope: ['history', 'identity'],
      redirectUri: cred.redirectUri,
    });

    window.location = authUrl;
  }

  @action
  getAllSavedContent = async () => {
    this.savedPosts = await this.instance.getMe().getSavedContent().fetchAll();
  }
}

export default Reddit;
