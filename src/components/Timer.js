import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  countDown as countDownAction,
  pause as pauseAction,
} from '../actions';

class Timer extends Component {
  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.startTimer);
  }

  startTimer() {
    const ONE_SECOND = 1000;
    setInterval(() => {
      const { timer, pause, paused, countDown } = this.props;
      if (timer > 0 && !paused) {
        countDown();
      }
      if (timer === 0 && !paused) {
        pause();
      }
    }, ONE_SECOND);
  }

  render() {
    const TWO_DIGITS = -2;
    const { timer } = this.props;

    return (
      <div>
        {timer === 0 ? (
          <h3>Tempo esgotado :- \ </h3>
        ) : (
          <h3>
            {'Timer: '}
            {(`0${timer}`).slice(TWO_DIGITS)}
          </h3>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  timer: state.gameReducer.timer,
  paused: state.gameReducer.pause,
});

const mapDispatchToProps = (dispatch) => ({
  countDown: () => dispatch(countDownAction()),
  pause: () => dispatch(pauseAction()),
});

Timer.propTypes = {
  timer: PropTypes.number,
  countDown: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  paused: PropTypes.bool.isRequired,
};

Timer.defaultProps = {
  timer: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
