import React from 'react';
import { toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import {
 Container, Input, Item, Select, Button, Segment 
} from 'semantic-ui-react';

const Posts = (props) => {
  console.log(toJS(props.store.reddit.savedPosts));

  return <Container>
    <Input
      fluid
      type='text'
      placeholder='Search...'
      icon='search'
      style={{ marginBottom: '2rem' }}
    />

    <Item.Group relaxed>
      {
        props.store.reddit.savedPosts.map((post) => (
        <Item key={post.id}>
          <Item.Image size="tiny" src={post?.preview?.images?.[0]?.source?.url} />

          <Item.Content>
            <Item.Header>{post?.title ?? post?.link_title}</Item.Header>
            <Item.Description>{post?.body ?? ''}</Item.Description>
          </Item.Content>
        </Item>))
      }
    </Item.Group>
  </Container>;
};

export default inject('store')(observer(Posts));
