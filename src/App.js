import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStories } from './actions/topStories';
import { compose, withPropTypes } from './api/enhance';
import Article from './components/Article';
import Feed from './components/Feed';
import Sections from './components/Sections';
import config from './config';

const { drawerWidth } = config.ui;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: `${theme.zIndex.drawer + 1} !important`,
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
}));

function App({ bootstrap, fetching, showFeed }) {
  const classes = useStyles();
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    if (bootstrapped) {
      return;
    }

    bootstrap();
    setBootstrapped(true);
  });

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

const enhance = compose(  
  connect(state => ({
    fetching: state.fetching,
    showFeed: !state.selectedStory
  }), dispatch => ({
    bootstrap: () => dispatch(fetchStories())
  })),
  withPropTypes({
    fetching: PropTypes.bool,
    bootstrap: PropTypes.func,
    showFeed: PropTypes.bool,
  }),
);

export default enhance(App);
