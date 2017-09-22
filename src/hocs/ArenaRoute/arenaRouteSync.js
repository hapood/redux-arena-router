import React, { Component } from "react";
import PropTypes from "prop-types";

class ArenaRouteSyncAgent extends Component {
  componentWillMount() {
    let { notifyData, setRouteState } = this.props;
    setRouteState({ location: notifyData.location, match: notifyData.match });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let { notifyData, setRouteState } = nextProps;
    setRouteState({ location: notifyData.location, match: notifyData.match });
  }

  render() {
    let { WrappedComponent, ...innerProps } = this.props;
    return React.createElement(WrappedComponent, innerProps);
  }
}

export default function(WrappedComponent, setRouteState) {
  let HOC = props => (
    <ArenaRouteSyncAgent
      WrappedComponent={WrappedComponent}
      setRouteState={setRouteState}
      {...props}
    />
  );
  HOC.displayName = "ArenaRouteSyncHOC";
  return HOC;
}
