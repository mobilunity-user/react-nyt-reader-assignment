import grey from '@material-ui/core/colors/grey';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const styles = theme => ({
  categoryTitle: {
    display: 'inline',
    paddingLeft: theme.spacing.unit,
    color: grey[700]
  }
});

const mapStateToProps = state => ({
  category: state.selectedSection
});

class FeedLabel extends React.Component {
  static get propTypes() {
    return {
      classes: PropTypes.object.isRequired,
      category: PropTypes.object
    }
  }

  render() {
    const { classes, category } = this.props;

    return (
      <Typography variant="h6" color="inherit" gutterBottom noWrap>
        Top Stories
        {category && <Typography variant="subtitle1" component="span" className={classes.categoryTitle}>
          ({category.title})
        </Typography>}
      </Typography>
    );
  }
}

export default withStyles(styles)(connect(mapStateToProps)(FeedLabel));
