import grey from '@material-ui/core/colors/grey';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React, { useCallback } from 'react';
import { useMappedState } from 'redux-react-hook';

const useStyles = makeStyles(theme => ({
  categoryTitle: {
    display: 'inline',
    paddingLeft: theme.spacing.unit,
    color: grey[700]
  }
}));

export default function FeedLabel() {
  const classes = useStyles();
  const mapState = useCallback(
    state => ({
      category: state.selectedSection
    }), [],
  );

  const { category } = useMappedState(mapState);

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
