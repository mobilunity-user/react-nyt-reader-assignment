import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { displayAll, displaySection } from '../actions/sectionStories';
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

function Section({ item, selected, opened, setOpened, classes, nested }) {
  const dispatch = useDispatch();
  const { children, title } = item;
  const is = stateItem => !!stateItem && (stateItem.title === item.title);
  const selectItem = useCallback(() => dispatch(displaySection(item)), [item]);

  const onItemClick = () => {
    const { children, title } = item;

    if (children) {
      setOpened(
        (opened && (opened.title === title))
          ? null : item
      );
    }

    selectItem();
  };

  return (
    <React.Fragment>
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
                item={item} opened={opened} setOpened={setOpened}
                nested classes={classes} selected={selected} key={item.title}
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
  setOpened: PropTypes.func,
  classes: PropTypes.object,
  nested: PropTypes.bool,
};

export default function Sections() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(null);
  const selectAll = useCallback(() => dispatch(displayAll()), []);

  const mapState = useCallback(
    state => ({
      items: state.sections,
      selected: state.selectedSection
    }), [],
  );

  const { items, selected } = useMappedState(mapState);

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
          classes={classes} selected={selected} key={item.title}
        />
      )}
    </List>
  );
};
