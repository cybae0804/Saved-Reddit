import React from 'react';
import { Menu } from 'semantic-ui-react';

const NavBar = () => (
  <Menu inverted borderless fluid style={{ borderRadius: 0, marginBottom: 0 }}>
    <Menu.Item header>Saved Reddit</Menu.Item>
    <Menu.Item
      link
      target="_blank"
      href="https://github.com/cybae0804/Saved-Reddit"
      icon="github"
      position="right"
    />
  </Menu>
);

export default NavBar;
