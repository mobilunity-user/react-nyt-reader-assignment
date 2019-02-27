import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { makeStyles } from '@material-ui/styles';
import { find, partial } from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { displayStory } from '../actions/storyContents';
import { compose, withPropTypes } from '../api/enhance';
import FeedLabel from './FeedLabel';
import ScrollToTopOnMount from './ScrollToTopOnMount';

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing.unit * 2
  },
  contentWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  media: {
    width: 210,
    height: 140,
    flex: '0 1 auto'
  },
  content: {
    flex: '1 1 auto'
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  byline: {
    minWidth: 210
  },
  chip: {
    margin: theme.spacing.unit,
  },
}));

function Feed({ items, display }) {
  const classes = useStyles();

  const renderItem = item => {
    const { title, abstract, published_date, byline, multimedia, des_facet } = item;
    const { url } = find(multimedia, {format: "mediumThreeByTwo210"}) || {};
    const published = moment(published_date).format("MMMM D, YYYY h:mma");
  
    return (
      <Card key={item.url} className={classes.card}>
        <div className={classes.contentWrap}>
          {url && <CardMedia className={classes.media} image={url} title={title} />}
          <div className={classes.content}>
            <CardHeader
              title={title} subheader={published} action={
                <Tooltip title="Read more...">
                  <IconButton onClick={partial(display, item)}><OpenInNewIcon /></IconButton>
                </Tooltip>
              }
            />
            <CardContent>
              <Typography component="p">{abstract}</Typography>
            </CardContent>
          </div>
        </div>
        <CardActions className={classes.actions} disableActionSpacing>
          {byline && <Typography component="span" variant="body1" color="textSecondary" className={classes.byline}>{byline}</Typography>}
          {(des_facet || []).map(tag => <Chip key={tag} avatar={<Avatar>#</Avatar>} label={tag} className={classes.chip} />)}
        </CardActions>
      </Card>
    )
  }

  return (
    <div>
      <ScrollToTopOnMount />
      <FeedLabel />
      {items.map(renderItem)}
    </div>
  );
}

const enhance = compose(
  connect(state => {
    const { stories, selectedSection, sectionStories } = state;
    let items = stories;
  
    if (selectedSection) {
      items = sectionStories[selectedSection.title];
    }
  
    return { items };
  }, dispatch => ({
    display: story => dispatch(displayStory(story))
  })),
  withPropTypes({
    items: PropTypes.array
  })
);

export default enhance(Feed);
