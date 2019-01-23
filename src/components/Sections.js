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
import { connect } from 'react-redux';
import { displaySection, displayAll } from '../actions/sectionStories';

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
});

const mapStateToProps = state => ({
  items: state.sections,
  selected: state.selectedSection
});

const mapDispatchToProps = dispatch => ({
  selectItem: item => dispatch(displaySection(item)),
  selectAll: () => dispatch(displayAll())
});

class Sections extends React.Component {
  static get propTypes() {
    return {
      classes: PropTypes.object.isRequired,
      items: PropTypes.array.isRequired,
      selectedSection: PropTypes.object
    }
  }

  state = { opened: null }

  onItemClick(item) {
    const { children } = item;
    const { selectItem } = this.props;

    if (children) {
      this.toggleItem(item);
    }

    selectItem(item);
  }

  toggleItem(item) {
    this.setState(state => {
      let { opened } = state;
      const { title } = item;

      if (opened && (opened.title === title)) {
        opened = null;
      } else {
        opened = item;
      }

      return { ...state, opened };
    });
  }

  isOpened({ title }) {
    const { opened } = this.state;

    if (!opened) {
      return false;
    }

    return opened.title === title;
  }

  isSelected({ title }) {
    const { selected } = this.props;

    if (!selected) {
      return false;
    }

    return selected.title === title;
  }

  render() {
    const { items, selected, selectAll } = this.props;

    return (
      <List component="nav">
        {items && items.length && (
          <ListItem button selected={!selected} onClick={selectAll}>
            <ListItemText primary="All Stories" />
          </ListItem>
        )}
        {items.map(item => this.renderItem(item))}
      </List>
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Sections));
