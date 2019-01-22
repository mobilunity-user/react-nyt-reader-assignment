import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { find } from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import FeedLabel from './FeedLabel';
import { connect } from 'react-redux';

const styles = theme => ({
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
})

const mapStateToProps = state => {
  const { stories, selectedSection, sectionStories } = state;
  let items = stories;

  if (selectedSection) {
    items = sectionStories[selectedSection.title];
  }

  return { items };
};

class Feed extends React.Component {
  static get propTypes() {
    return {
      classes: PropTypes.object.isRequired,
      items: PropTypes.array.isRequired
    }
  }

  render() {
    const { items } = this.props;

    return (
      <div>
        <FeedLabel />
        {items.map(item => this.renderItem(item))}
      </div>
    );
  }

  renderItem(item) {
    const {
      title, abstract, published_date,
      byline, multimedia, des_facet
    } = item;

    const { classes } = this.props;
    const { url } = find(multimedia, {format: "mediumThreeByTwo210"});
    const published = moment(published_date).format("MMMM D, YYYY h:mma");

    return (
      <Card key={item.url} className={classes.card}>
        <div className={classes.contentWrap}>
          <CardMedia className={classes.media} image={url} title={title} />
          <div className={classes.content}>
            <CardHeader
              title={title} subheader={published} action={
                <Tooltip title="Read more...">
                  <IconButton><OpenInNewIcon /></IconButton>
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
}

export default withStyles(styles)(connect(mapStateToProps)(Feed));
