import React from 'react';
import { observer, inject } from 'mobx-react';
import { Loader, Segment } from 'semantic-ui-react';

import NavBar from 'components/NavBar';
import Landing from 'components/Landing';
import Posts from 'components/Posts';

const App = (props) => {
  const renderPage = () => {
    if (props.store.reddit.loading) return <Loader inverted active size="huge">Loading...</Loader>;
    if (props.store.reddit.savedPosts.length) return <Posts />;
    return <Landing />;
  };

  return (
    <div className="App">
      <NavBar />
      <Segment
        color="blue"
        inverted
        basic
        style={{
          margin: 0,
          minHeight: 'calc(100vh - 40px)',
        }}
      >
        {renderPage()}
      </Segment>
    </div>
  );
};

export default inject('store')(observer(App));
