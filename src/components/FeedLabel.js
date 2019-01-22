import grey from '@material-ui/core/colors/grey';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  categoryTitle: {
    display: 'inline',
    paddingLeft: theme.spacing.unit,
    color: grey[700]
  }
})

class FeedLabel extends React.Component {
  static get propTypes() {
    return {
      classes: PropTypes.object.isRequired
    }
  }

  state = { }

  render() {
    const { category, props } = this;
    const { classes } = props;

    return (
      <Typography variant="h6" color="inherit" gutterBottom noWrap>
        Top Stories
        <Typography variant="subtitle1" component="span" className={classes.categoryTitle}>
          ({category})
        </Typography>
      </Typography>
    );
  }

  category = 'U.S.'
}

export default withStyles(styles)(FeedLabel);
