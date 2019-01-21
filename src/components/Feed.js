import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { filter, find, join, lowerCase, lowerFirst, startCase } from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  categoryTitle: {
    display: 'inline',
    paddingLeft: theme.spacing.unit,
    color: grey[700]
  },
  card: {

  },
  content: {

  },
  media: {
    width: 210,
    height: 140,
    float: 'left'
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: red[500],
  },
})

class Feed extends React.Component {
  static get propTypes() {
    return {
      classes: PropTypes.object.isRequired
    }
  }

  state = { }

  render() {
    const { category, items, props } = this;
    const { classes } = props;

    return (
      <div>
        <Typography variant="h6" color="inherit" gutterBottom noWrap>
          Top Stories
          <Typography variant="subtitle1" component="span" className={classes.categoryTitle}>
            ({category})
          </Typography>
        </Typography>
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
    const author = lowerFirst(startCase(lowerCase(byline || '')));
    const subheader = join(filter([published, author]), ' ');

    return (
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={url} title={title} />
        <div className={classes.content}>
          <CardHeader
            title={title} subheader={subheader} action={
              <IconButton>
                <OpenInNewIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Typography component="p">{abstract} </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing></CardActions>
        </div>
      </Card>
    )
  }

  category = 'U.S.'

  items = [
    {
        "section": "U.S.",
        "subsection": "Politics",
        "title": "Republicans Push Trump Immigration Plan, Seeking to Corner Democrats on Shutdown",
        "abstract": "Republican leaders hope to pressure Democrats — who insist they won’t negotiate with President Trump on border security until the shutdown ends — not to block Mr. Trump’s proposal.",
        "url": "https://www.nytimes.com/2019/01/20/us/politics/trump-government-shutdown-democrats-pence.html",
        "byline": "By SHERYL GAY STOLBERG",
        "item_type": "Article",
        "updated_date": "2019-01-20T20:36:25-05:00",
        "created_date": "2019-01-20T12:29:19-05:00",
        "published_date": "2019-01-20T12:29:19-05:00",
        "material_type_facet": "",
        "kicker": "",
        "des_facet": [
            "United States Politics and Government",
            "Illegal Immigration",
            "Shutdowns (Institutional)",
            "Deferred Action for Childhood Arrivals",
            "Border Barriers"
        ],
        "org_facet": [
            "Democratic Party",
            "Senate"
        ],
        "per_facet": [
            "Pence, Mike",
            "Trump, Donald J",
            "Wallace, Chris (1947- )"
        ],
        "geo_facet": [
        ],
        "multimedia": [
            {
                "url": "https://static01.nyt.com/images/2019/01/20/us/21dc-shutdown/21dc-trump-thumbStandard.jpg",
                "format": "Standard Thumbnail",
                "height": 75,
                "width": 75,
                "type": "image",
                "subtype": "photo",
                "caption": "President Trump said on Saturday that he would extend temporary protections for some undocumented immigrants if Democrats gave him $5.7 billion for a border wall.",
                "copyright": "Tom Brenner for The New York Times"
            },
            {
                "url": "https://static01.nyt.com/images/2019/01/20/us/21dc-shutdown/21dc-trump-thumbLarge.jpg",
                "format": "thumbLarge",
                "height": 150,
                "width": 150,
                "type": "image",
                "subtype": "photo",
                "caption": "President Trump said on Saturday that he would extend temporary protections for some undocumented immigrants if Democrats gave him $5.7 billion for a border wall.",
                "copyright": "Tom Brenner for The New York Times"
            },
            {
                "url": "https://static01.nyt.com/images/2019/01/20/us/21dc-shutdown/21dc-trump-articleInline.jpg",
                "format": "Normal",
                "height": 127,
                "width": 190,
                "type": "image",
                "subtype": "photo",
                "caption": "President Trump said on Saturday that he would extend temporary protections for some undocumented immigrants if Democrats gave him $5.7 billion for a border wall.",
                "copyright": "Tom Brenner for The New York Times"
            },
            {
                "url": "https://static01.nyt.com/images/2019/01/20/us/21dc-shutdown/21dc-trump-mediumThreeByTwo210.jpg",
                "format": "mediumThreeByTwo210",
                "height": 140,
                "width": 210,
                "type": "image",
                "subtype": "photo",
                "caption": "President Trump said on Saturday that he would extend temporary protections for some undocumented immigrants if Democrats gave him $5.7 billion for a border wall.",
                "copyright": "Tom Brenner for The New York Times"
            },
            {
                "url": "https://static01.nyt.com/images/2019/01/20/us/21dc-shutdown/21dc-trump-superJumbo.jpg",
                "format": "superJumbo",
                "height": 1365,
                "width": 2048,
                "type": "image",
                "subtype": "photo",
                "caption": "President Trump said on Saturday that he would extend temporary protections for some undocumented immigrants if Democrats gave him $5.7 billion for a border wall.",
                "copyright": "Tom Brenner for The New York Times"
            }
        ],
        "short_url": "https://nyti.ms/2Hm2A29"
    }
  ]
}

export default withStyles(styles)(Feed);
