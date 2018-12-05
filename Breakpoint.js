import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class Breakpoint extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    breakAt: PropTypes.shape({
      targetIs: PropTypes.oneOf(['lt', 'gt']).isRequired,
      value: PropTypes.number.isRequired,
    }).isRequired,
  };

  state = {
    width: 0,
  };

  componentDidMount() {
    const { width } = this.state;
    if (width === 0) {
      this.handleWindowSizeChange();
    }
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  testTarget = () => {
    const { breakAt } = this.props;
    const { width } = this.state;

    if (breakAt.targetIs === 'gt') {
      return width >= breakAt.value;
    }
    return width <= breakAt.value;
  };

  render() {
    const { children } = this.props;
    const show = this.testTarget();
    return <Fragment>{children(show)}</Fragment>;
  }
}
