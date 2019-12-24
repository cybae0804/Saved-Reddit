import snoowrap from 'snoowrap';
import cred from 'configs/credentials';
import { observable, action } from 'mobx';

class Reddit {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable savedPosts = [];

  initiateOAuth = () => {
    const authUrl = snoowrap.getAuthUrl({
      clientId: cred.clientId,
      scope: ['history', 'identity'],
      redirectUri: cred.redirectUri,
      permanent: false,
    });

    window.location = authUrl;
  }

  @action
  validateCode = async (code) => {
    const instance = await snoowrap.fromAuthCode({
      code,
      userAgent: cred.userAgent,
      clientId: cred.clientId,
      redirectUri: cred.redirectUri,
    });

    this.savedPosts = await instance.getMe().getSavedContent();
  }
}

export default Reddit;
