import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import PropTypes from 'prop-types';
import React from 'react';
import { fetchStories } from './actions/topStories';
import decorate from './api/decorate';
import Article from './components/Article';
import Feed from './components/Feed';
import Sections from './components/Sections';
import config from './config';

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

const propsMap = state => ({
  fetching: state.fetching,
  showFeed: !state.selectedStory
});

const actionsMap = dispatch => ({
  bootstrap: () => dispatch(fetchStories())
});

class App extends React.Component {
  static get propTypes() {
    return {
      classes: PropTypes.object.isRequired,
      fetching: PropTypes.bool.isRequired,
      bootstrap: PropTypes.func.isRequired,
      showFeed: PropTypes.bool.isRequired,
    }
  }

  componentWillMount() {
    const { bootstrap } = this.props;

    bootstrap();
  }

  render() {
    const { classes, fetching, showFeed } = this.props;

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
          {fetching ? <LinearProgress /> : (showFeed ? <Feed /> : <Article />)}
        </main>
      </div>
    );
  }
}

export default decorate(App, { styles, propsMap, actionsMap });
