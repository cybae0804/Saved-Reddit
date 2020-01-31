import React from 'react';
import { observer, inject } from 'mobx-react';
import {
  Icon, Input, Menu, Dropdown,
} from 'semantic-ui-react';

const SideMenu = (props) => {
  const {
    sortBy,
    setSortBy,
    searchByContent,
    searchBySubreddit,
    setSearchByContent,
    setSearchBySubreddit,
    reset,
  } = props.store.ui;

  const handleSortByClick = (e, { name }) => setSortBy(name);

  return (
    <Menu vertical>
      <Menu.Item
        header
        content="Search by..."
      />
      <Menu.Menu>
        <Menu.Item>
          <Input
            placeholder='Content'
            value={searchByContent || ''}
            onChange={(e) => setSearchByContent(e.target.value)}
          />
        </Menu.Item>
        <Menu.Item>
          <Input
            placeholder='Subreddit'
            value={searchBySubreddit || ''}
            onChange={(e) => setSearchBySubreddit(e.target.value)}
          />
        </Menu.Item>
      </Menu.Menu>

      <Menu.Item
        header
        content="Sort by..."
      />
      <Menu.Menu text vertical>
        <Menu.Item
          name="Recent"
          active={sortBy === 'Recent'}
          onClick={handleSortByClick}
        />
        <Menu.Item
          name="Score"
          active={sortBy === 'Score'}
          onClick={handleSortByClick}
        />
      </Menu.Menu>

      <Menu.Item
        header
        content="Reset"
        onClick={reset}
      />
    </Menu>
  );
};

export default inject('store')(observer(SideMenu));
