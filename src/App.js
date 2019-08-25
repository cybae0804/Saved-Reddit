import React, { Component } from 'react';
import snoowrap from 'snoowrap';
import { Button } from 'semantic-ui-react';
import qs from 'query-string';
import { withRouter } from 'react-router-dom';
import cred from './credentials';

class App extends Component {
  componentDidMount() {
    const { code } = qs.parse(window.location.search);
    
    if (code) {
      this.validateCode(code);
    }
  }

  initiateOAuth() {
    const authUrl = snoowrap.getAuthUrl({
      clientId: cred.clientId,
      scope: ['history'],
      redirectUri: cred.redirectUri,
      permanent: false,
    });

    window.location = authUrl;
  }

  validateCode = async (code) => {
    const instance = await snoowrap.fromAuthCode({
      code,
      userAgent: cred.userAgent,
      clientId: cred.clientId,
      redirectUri: cred.redirectUri,
    });

    const saved = await instance.getMe().getSavedContent();
    console.log('saved', saved);
  }

  render() {
    return (
      <div className="App">
        <Button onClick={this.initiateOAuth}>
          Authenticate
        </Button>
      </div>
    );
  }
}

export default withRouter(App);
