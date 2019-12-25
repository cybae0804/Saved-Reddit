import React, { Component } from 'react';
import { Button, Container } from 'semantic-ui-react';
import { toJS } from 'mobx';
import { observer, inject } from 'mobx-react';

import NavBar from 'components/NavBar';
import Landing from 'components/Landing';

@inject('store')
@observer
class App extends Component {
  render() {
    console.log(toJS(this.props.store.reddit.savedPosts));
    return (
      <div className="App">
        <NavBar />
        <Landing />
      </div>
    );
  }
}

export default App;
