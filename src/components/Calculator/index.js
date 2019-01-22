import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CButton from './CButton';

const styles = theme => ({
  card: {
    display: 'flex',
    maxWidth: 300,
  },
});

function Display(props) {
  return <TextField align="right" variant="outlined" value={props.value} />;
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayValue: '0',
      previousValue: '',
      operator: '',
      isNext: false,
    };
  }

  renderSquare(i) {
    return (
      <Grid item xs={3}>
        <CButton value={i} onClick={() => this.handleClick(i)} />
      </Grid>
    );
  }

  renderDisplay(i) {
    return (
      <Grid item xs={12}>
        <Display value={i} />
      </Grid>
    );
  }

  handleOperation(num1, operator, num2) {
    let num = 0;

    if (operator == '+') {
      num = parseFloat(num1) + parseFloat(num2);
    } else if (operator == '-') {
      num = parseFloat(num1) - parseFloat(num2);
    } else if (operator == '/') {
      num = parseFloat(num1) / parseFloat(num2);
    } else {
      num = parseFloat(num1) * parseFloat(num2);
    }

    return num.toString();
  }

  handleClick(i) {
    let display = this.state.displayValue;
    let previousValue = this.state.previousValue;
    let operator = this.state.operator;
    let isNext = this.state.isNext;

    if (i == 'B') {
      if (!isNext) {
        if (display.length == 1) {
          display = '0';
        } else {
          display = display.slice(0, display.length - 1);
        }
      }
    } else if (i == 'C') {
      display = '0';
    } else if (i == 'CE') {
      display = '0';
      previousValue = '';
      operator = '';
      isNext = false;
    } else if (i == '=' || i == '+' || i == '-' || i == 'x' || i == '/') {
      if (i == '=') {
        if (previousValue != '') {
          display = this.handleOperation(previousValue, operator, display);
          previousValue = '';
          operator = '';
          isNext = true;
        }
      } else if (i == '+') {
        if (previousValue == '') {
          previousValue = display;
        } else {
          previousValue = this.handleOperation(
            previousValue,
            operator,
            display,
          );
        }
        operator = '+';
        isNext = true;
      } else if (i == '-') {
        if (previousValue == '') {
          previousValue = display;
        } else {
          previousValue = this.handleOperation(
            previousValue,
            operator,
            display,
          );
        }
        operator = '-';
        isNext = true;
      } else if (i == '/') {
        if (previousValue == '') {
          previousValue = display;
        } else {
          previousValue = this.handleOperation(
            previousValue,
            operator,
            display,
          );
        }
        operator = '/';
        isNext = true;
      } else {
        if (previousValue == '') {
          previousValue = display;
        } else {
          previousValue = this.handleOperation(
            previousValue,
            operator,
            display,
          );
        }
        operator = '*';
        isNext = true;
      }
    } else {
      if (display == '0') {
        display = i.toString();
        isNext = false;
      } else {
        if (isNext) {
          isNext = false;
          display = '';
        }
        display = display + i;
      }
    }

    this.setState({
      displayValue: display,
      previousValue: previousValue,
      operator: operator,
      isNext: isNext,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <Grid container spacing={8}>
          <Grid container item xs={12} spacing={24}>
            {this.renderDisplay(this.state.displayValue)}
          </Grid>
          <Grid container item xs={12} spacing={24}>
            {this.renderSquare()}
            {this.renderSquare('CE')}
            {this.renderSquare('C')}
            {this.renderSquare('B')}
          </Grid>
          <Grid container item xs={12} spacing={24}>
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            {this.renderSquare(9)}
            {this.renderSquare('/')}
          </Grid>
          <Grid container item xs={12} spacing={24}>
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            {this.renderSquare(6)}
            {this.renderSquare('x')}
          </Grid>
          <Grid container item xs={12} spacing={24}>
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
            {this.renderSquare('-')}
          </Grid>
          <Grid container item xs={12} spacing={24}>
            {this.renderSquare(0)}
            {this.renderSquare('.')}
            {this.renderSquare('=')}
            {this.renderSquare('+')}
          </Grid>
        </Grid>
      </Card>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Calculator);
