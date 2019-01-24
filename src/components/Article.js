import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { filter, find, join } from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { displayLastOpened } from '../actions/sectionStories';
import decorate from '../api/decorate';
import FeedLabel from './FeedLabel';
import ScrollToTopOnMount from './ScrollToTopOnMount';

const styles = theme => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  paragraph: {
    marginBottom: theme.spacing.unit
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  backIcon: {
    marginRight: theme.spacing.unit,
  }
});

const propsMap = state => {
  const { selectedStory, storiesContents } = state;
  const item = selectedStory;
  let contents = [];

  if (item) {
    contents = storiesContents[item.url];
  }

  return { item, contents };
};

const actionsMap = dispatch => ({
  goBack: () => dispatch(displayLastOpened())
});

class Article extends React.Component {
  static get propTypes() {
    return {
      classes: PropTypes.object.isRequired,
      item: PropTypes.object.isRequired,
      contents: PropTypes.array
    }
  }

  render() {
    const {
      item, contents,
      goBack, classes,
    } = this.props;

    const {
      title, abstract,
      published_date,
      byline, multimedia
    } = item;

    const { url } = find(multimedia, {format: "superJumbo"}) || {};
    const published = moment(published_date).format("MMMM D, YYYY h:mma");
    const subtitle = join(filter([published, byline]), ' ');

    return (
      <div>
        <ScrollToTopOnMount />
        <FeedLabel />
        <Card>
          <CardHeader title={title} subheader={subtitle} />
          {url && <CardMedia className={classes.media} image={url} title={title} />}
          <CardContent>
            {(!contents || !contents.length)
              ? (
                <Typography component="p" className={classes.paragraph}>
                  {abstract}
                </Typography>
              ) : contents.map((paragraph, index) => (
                <Typography key={index} component="p" className={classes.paragraph}>
                  {paragraph}
                </Typography>)
              )
            }
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
          <Fab variant="extended" onClick={goBack}>
            <ArrowBackIcon className={classes.backIcon} />
            Back to top stories
          </Fab>
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default decorate(Article, { styles, propsMap, actionsMap });
