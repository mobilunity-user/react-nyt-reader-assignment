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

function Section({ item, selected, selectItem, opened, setOpened, classes, nested }) {
  const { children, title } = item;
  const is = stateItem => !!stateItem && (stateItem.title === item.title);

  const onItemClick = () => {
    const { children } = item;

    if (children) {
      toggleItem(item);
    }

    selectItem(item);
  };

  const toggleItem = () => {
    const { title } = item;

    setOpened(
      (opened && (opened.title === title))
        ? null : item
    );
  };

  return (
    <React.Fragment key={title}>
      <ListItem button selected={is(selected)} onClick={onItemClick}>
        {!nested
          ? <ListItemText primary={title} />
          : <ListItemText inset primary={item.title} className={classes.nested} />
        }
        {children && (is(opened) ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      {children &&
        <Collapse in={is(opened)} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map(item =>
              <Section
                item={item} opened={opened} setOpened={setOpened} nested
                classes={classes} selected={selected} selectItem={selectItem}
              />
            )}
          </List>
        </Collapse>
      }
    </React.Fragment>
  );
}

Section.propTypes = {
  item: PropTypes.object,
  opened: PropTypes.object,
  selected: PropTypes.object,
  selectItem: PropTypes.func,
  setOpened: PropTypes.func,
  classes: PropTypes.object,
  nested: PropTypes.bool,
};

function Sections({ items, selected, selectAll, selectItem }) {
  const classes = useStyles();
  const [opened, setOpened] = useState(null);

  return (
    <List component="nav">
      {!isEmpty(items) && (
        <ListItem button selected={!selected} onClick={selectAll}>
          <ListItemText primary="All Stories" />
        </ListItem>
      )}
      {items.map(item =>
        <Section
          item={item} opened={opened} setOpened={setOpened}
          classes={classes} selected={selected} selectItem={selectItem}
        />
      )}
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
    selected: PropTypes.object,
    selectItem: PropTypes.func,
    selectAll: PropTypes.func,
  }),
);

export default enhance(Sections);
