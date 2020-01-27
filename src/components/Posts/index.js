import React from 'react';
import { toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import {
  Container, Input, Segment, Image, Header, Label, Grid, Divider,
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

    {
      props.store.reddit.savedPosts.map((post) => {
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
          >
            <Grid>
              {preview && (
                <Grid.Column width={2}>
                  <Image
                    src={preview}
                    size="tiny"
                    floated="left"
                    rounded
                  />
                </Grid.Column>
              )}

              <Grid.Column width={preview ? 14 : 16} style={{ paddingLeft: preview ? 0 : null }}>
                <Grid.Row>
                  <Header
                    content={title}
                    as="a"
                    target="_blank"
                    href={url}
                  />
                </Grid.Row>
                <Grid.Row>
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
                </Grid.Row>
                <Divider hidden style={{ margin: '0.5rem' }} />
                <Grid.Row>
                  {body}
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </Segment>
        );
      })
    }
  </Container>;
};

export default inject('store')(observer(Posts));
