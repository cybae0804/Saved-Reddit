import React from 'react';
import {
  Header, Button, Segment, Icon, Image,
} from 'semantic-ui-react';
import image from 'assets/Search_SVG.svg';

const Landing = () => (
  <Segment
    padded="very"
    size="massive"
    color="blue"
    inverted
    basic
    style={{
      margin: 0,
      minHeight: 'calc(100vh - 40px)',
      padding: '10rem',
    }}
  >
    <Image
      src={image}
      size="large"
      centered
    />
    <Header
      size="huge"
      textAlign="center"
    >
      Organize your Saved Posts from Reddit
      <Header.Subheader style={{ marginTop: '2rem' }}>
        <Button basic inverted animated="fade">
          <Button.Content visible>Authenticate</Button.Content>
          <Button.Content hidden style={{ transform: 'translateY(-50%)', marginTop: 0 }}>
            <Icon name="reddit" fitted size="large" />
          </Button.Content>
        </Button>
      </Header.Subheader>
    </Header>
  </Segment>
);

export default Landing;
