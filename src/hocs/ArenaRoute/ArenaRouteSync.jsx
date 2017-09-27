import React, { Component } from "react";

export default class ArenaRouteSync extends Component {
  componentWillMount() {
    let { routeProps, setRouteState } = this.props;
    setRouteState(routeProps);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let { routeProps, setRouteState } = nextProps;
    if (routeProps !== this.props.routeProps) {
      setRouteState(routeProps);
    }
  }

  render() {
    return this.props.children;
  }
}
