import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { toJS } from 'mobx';
import { observer, inject } from 'mobx-react';

@inject('store')
@withRouter
@observer
class App extends Component {
  render() {
    console.log(toJS(this.props.store.reddit.savedPosts));
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
