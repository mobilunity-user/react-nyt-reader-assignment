import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/styles';
import { filter, find, join } from 'lodash';
import moment from 'moment';
import React, { useCallback } from 'react';
import { displayLastOpened } from '../actions/sectionStories';
import FeedLabel from './FeedLabel';
import ScrollToTopOnMount from './ScrollToTopOnMount';
import { useDispatch, useMappedState } from 'redux-react-hook';

const useStyles = makeStyles(theme => ({
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
}));

export default function Article() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const mapState = useCallback(
    state => {
      const { selectedStory, storiesContents } = state;
      const item = selectedStory;
      let contents = [];

      if (item) {
        contents = storiesContents[item.url];
      }

      return { item, contents };
    }, [],
  );

  const { item, contents } = useMappedState(mapState);
  const goBack = useCallback(() => dispatch(displayLastOpened()), []);
  const { title, abstract, published_date, byline, multimedia } = item;
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
};
