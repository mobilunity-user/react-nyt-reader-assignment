import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

function decorate(Component, { styles = null, propsMap = null, actionsMap = null }) {
  let decorated = Component;

  if (propsMap || actionsMap) {
    decorated = connect(propsMap, actionsMap)(decorated);
  }

  if (styles) {
    decorated = withStyles(styles)(decorated);
  }

  return decorated;
}

export default decorate;