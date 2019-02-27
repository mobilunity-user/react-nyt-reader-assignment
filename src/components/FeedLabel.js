import grey from '@material-ui/core/colors/grey';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose, withPropTypes } from '../api/enhance';

const useStyles = makeStyles(theme => ({
  categoryTitle: {
    display: 'inline',
    paddingLeft: theme.spacing.unit,
    color: grey[700]
  }
}));

function FeedLabel({ category }) {
  const classes = useStyles();

  return (
    <Typography variant="h6" color="inherit" gutterBottom noWrap>
      Top Stories
      {category && 
        <Typography variant="subtitle1" component="span" className={classes.categoryTitle}>
          ({category.title})
        </Typography>
      }
    </Typography>
  );
};

const enhance = compose(
  connect(state => ({
    category: state.selectedSection
  })),
  withPropTypes({
    category: PropTypes.object
  }),
);

export default enhance(FeedLabel);
