import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  Button: {
    // margin: 2,
    // width: '100%',
    // height: '100%',
  },
});

function CButton(props) {
  const { classes } = props;
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.Button}
      onClick={props.onClick}
    >
      {props.value}
    </Button>
  );
}

export default withStyles(styles, { withTheme: true })(CButton);
