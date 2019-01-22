import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import PropTypes from 'prop-types';
import React from 'react';
import Sections from './components/Sections';
import config from './config';
import Feed from './components/Feed';
//import Article from './components/Article';
import { topStories } from './api/nyt';
// import LinearProgress from '@material-ui/core/LinearProgress';

const { drawerWidth } = config.ui;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  appIcon: {
    marginLeft: -12,
    marginRight: 20,
  },
  toolbar: theme.mixins.toolbar,
});

class App extends React.Component {
  static get propTypes() {
    return {
      classes: PropTypes.object.isRequired
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <ChromeReaderModeIcon className={classes.appIcon} color="inherit" />
            <Typography variant="h6" color="inherit" noWrap>
              React NYT Browser
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <Sections />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Feed />
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(App);
