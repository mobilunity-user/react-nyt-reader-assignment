import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import { isEmpty, partial } from 'lodash';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { displayAll, displaySection } from '../actions/sectionStories';
import { compose, withPropTypes } from '../api/enhance';
import config from '../config';

const { drawerWidth } = config.ui;

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: drawerWidth,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: `${theme.spacing.unit * 2}px !important`,
  },
}));

function Sections({ items, selected, selectAll, selectItem }) {
  const classes = useStyles();
  const [opened, setOpened] = useState(null);

  const onItemClick = item => {
    const { children } = item;

    if (children) {
      toggleItem(item);
    }

    selectItem(item);
  };

  const toggleItem = item => {
    const { title } = item;

    setOpened(
      (opened && (opened.title === title)) 
        ? null : item
    );
  };

  const isOpened = item => !!opened 
    && (opened.title === item.title);

  const isSelected = item => !!selected 
    && (selected.title === item.title);

  const renderItem = item => {
    const { children, title } = item;

    return (
      <React.Fragment key={title}>
        <ListItem button selected={isSelected(item)} onClick={partial(onItemClick, item)}>
          <ListItemText primary={title} />
          {children && (isOpened(item) ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
        {children && renderChildren(item)}
      </React.Fragment>
    );
  };

  const renderChildren = item => {
    const { children } = item;    

    return (
      <Collapse in={isOpened(item)} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.map(item => (
            <ListItem button key={item.title} selected={isSelected(item)} onClick={partial(onItemClick, item)}>
              <ListItemText inset primary={item.title} className={classes.nested} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    );
  };

  return (
    <List component="nav">
      {!isEmpty(items) && (
        <ListItem button selected={!selected} onClick={selectAll}>
          <ListItemText primary="All Stories" />
        </ListItem>
      )}
      {items.map(renderItem)}
    </List>
  );
}

const enhance = compose(
  connect(state => ({
    items: state.sections,
    selected: state.selectedSection
  }), dispatch => ({
    selectItem: item => dispatch(displaySection(item)),
    selectAll: () => dispatch(displayAll())
  })),
  withPropTypes({
    items: PropTypes.array,
    selectedSection: PropTypes.object
  }),
);

export default enhance(Sections);
