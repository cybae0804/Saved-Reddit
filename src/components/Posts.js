import React, { useRef } from 'react';
// import { toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import {
  Container, Input, Segment, Image, Header, Label, Divider,
  Rail, Ref, Sticky,
} from 'semantic-ui-react';

import SideMenu from './SideMenu';

const Posts = (props) => {
  // console.log(toJS(props.store.ui.resultingPosts));

  const ref = useRef(null);

  const posts = props.store.ui.resultingPosts.map((post) => {
    const preview = post?.preview?.images?.[0]?.source?.url;
    const title = post?.title ?? post?.link_title ?? '';
    const commentsCount = post?.num_comments ?? 0;
    const score = post?.score ?? 0;
    const nsfw = post?.over_18 ?? false;
    const body = post?.body ?? '';

    const url = post?.url ?? null;
    const commentsLink = `https://www.reddit.com${post.permalink}`;
    const subreddit = post?.subreddit_name_prefixed;

    return (
      <Segment
        key={post.id}
        raised
        color={nsfw ? 'red' : null}
        style={{ display: 'flex' }}
      >
        {
          preview
          && (<div style={{ maxWidth: '5rem', marginRight: '1rem' }}>
            <Image
              src={preview}
              size="tiny"
              rounded
            />
          </div>)
        }
        <div>
          <Header
            content={title}
            as="a"
            target="_blank"
            href={url}
          />
          <div>
            <Label
              icon='comments'
              content={commentsCount}
              size="mini"
              as="a"
              target="_blank"
              href={commentsLink}
            />
            <Label
              icon='arrow up'
              content={score}
              size="mini"
            />
            <Label
              icon='reddit alien'
              content={subreddit}
              size="mini"
              as="a"
              target="_blank"
              href={`https://www.reddit.com/${subreddit}`}
            />
          </div>
          <Divider hidden style={{ margin: '0.5rem' }} />
          <div>
            {body}
          </div>
        </div>
      </Segment>
    );
  });

  return (
      <Container>
        <Input
          fluid
          type='text'
          placeholder='Search...'
          icon='search'
          style={{ marginBottom: '2rem' }}

          value={props.store.ui.searchByContent}
          onChange={(e, { value }) => props.store.ui.setSearchByContent(value)}
        />

        <Ref innerRef={ref}>
          <Segment basic style={{ padding: 0 }}>
            {
              props.store.ui.resultingPosts.length
                ? posts
                : <Header as='h2' textAlign="center" block>
                    No posts found... :(
                  </Header>
            }

            <Rail position='right'>
              <Sticky context={ref}>
                <SideMenu />
              </Sticky>
            </Rail>
          </Segment>
        </Ref>
      </Container>
  );
};

export default inject('store')(observer(Posts));
