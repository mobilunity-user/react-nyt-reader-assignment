import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import PropTypes from 'prop-types';
import React from 'react';
import config from '../config';

const { drawerWidth } = config.ui;

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: drawerWidth,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: `${theme.spacing.unit * 2}px !important`,
  },
})

class Sections extends React.Component {
  static get propTypes() {
    return {
      classes: PropTypes.object.isRequired
    }
  }

  state = { opened: null, selected: null }

  onItemClick(item) {
    const { children } = item;

    if (children) {
      this.toggleItem(item);
    }

    this.selectItem(item);
  }

  toggleItem({ title }) {
    this.setState(state => ({
      ...state, opened: (state.opened === title)
        ? null : title
    }))
  }

  selectItem({ title }) {
    this.setState(state => ({ ...state, selected: title }))
  }

  isOpened({ title }) {
    const { state } = this;

    return state.opened === title;
  }

  isSelected({ title }) {
    const { state } = this;

    return state.selected === title;
  }

  render() {
    const items = [{
      title: 'U.S.',
      children: [{
        title: 'Politics'
      }]
    }, {
      title: 'Business'
    }];

    return (
      <List component="nav">{items.map(item => this.renderItem(item))}</List>
    );
  }

  renderItem(item) {
    const { children, title } = item;

    return (
      <React.Fragment key={title}>
        <ListItem button selected={this.isSelected(item)} onClick={() => this.onItemClick(item)}>
          <ListItemText primary={title} />
          {children && (this.isOpened(item) ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
        {children && this.renderChildren(item)}
      </React.Fragment>
    );
  }

  renderChildren(item) {
    const { children } = item;
    const { classes } = this.props;

    return (
      <Collapse in={this.isOpened(item)} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.map(item => (
            <ListItem button key={item.title} selected={this.isSelected(item)} onClick={() => this.onItemClick(item)}>
              <ListItemText inset primary={item.title} className={classes.nested} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    );
  }
}

export default withStyles(styles)(Sections);
