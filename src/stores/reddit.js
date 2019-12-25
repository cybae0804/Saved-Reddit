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
    const { code } = qs.parse(window.location.search);

    if (code) {
      await this.validateCode(code);
      localStorage.setItem('code', code);
      window.location.replace(cred.redirectUri);
    } else {
      const savedCode = localStorage.getItem('code');

      if (savedCode) await this.validateCode(savedCode);
    }

    if (this.instance) await this.getAllSavedContent();

    this.loading = false;
  }

  @action
  validateCode = async (code) => {
    try {
      this.loading = true;
      this.instance = await snoowrap.fromAuthCode({
        code,
        userAgent: cred.userAgent,
        clientId: cred.clientId,
        redirectUri: cred.redirectUri,
      });
    } catch (e) {
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
    this.loading = true;
    this.savedPosts = await this.instance.getMe().getSavedContent().fetchAll();
    this.loading = false;
  }
}

export default Reddit;
