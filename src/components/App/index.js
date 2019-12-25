import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import qs from 'query-string';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

@inject('store')
@withRouter
@observer
class App extends Component {
  componentDidMount() {
    const { code } = qs.parse(window.location.search);

    if (code) {
      this.props.store.reddit.validateCode(code);
    }
  }

  render() {
    console.log(this.props.store.reddit.savedPosts);
    return (
      <div className="App">
        <Button onClick={this.props.store.reddit.initiateOAuth}>
          Authenticate
        </Button>
      </div>
    );
  }
}

export default App;
