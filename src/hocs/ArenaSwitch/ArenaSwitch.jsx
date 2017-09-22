import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";

export default class ArenaSwitch extends Component {
  static propTypes = {
    location: PropTypes.object,
    children: PropTypes.any
  };

  render() {
    return (
      <Switch location={this.props.location}>{this.props.children}</Switch>
    );
  }
}
