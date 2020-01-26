import React from 'react';
import { toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import {
  Container, Input, Segment, Image, Header, Label, Grid,
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

        return (
          <Segment
            key={post.id}
            raised
            color={nsfw ? 'red' : null}
            onClick={() => window.open(url, '_blank')}
          >
            <Grid>
              {preview && (
                <Grid.Column width={2}>
                  <Image src={preview} size="tiny" rounded floated="left" />
                </Grid.Column>
              )}

              <Grid.Column width={preview ? 14 : 16} style={{ paddingLeft: 0 }}>
                <Grid.Row>
                  <Header content={title} />
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
                  <Label icon='arrow up' content={score} size="mini" />
                </Grid.Row>
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
