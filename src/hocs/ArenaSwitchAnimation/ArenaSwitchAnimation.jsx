import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ArenaSwitchAnimation extends Component {
  static propTypes = {
    animationRender: PropTypes.func
  };

  componentWillMount() {
    this.state = { nextPhase: false };
  }

  componentWillReceiveProps(nextProps) {}

  render() {
    let { oldPlay, newPlay, phase, animationRender, nextPhase } = this.props;
    return animationRender(phase, oldPlay, newPlay, nextPhase);
  }
}
