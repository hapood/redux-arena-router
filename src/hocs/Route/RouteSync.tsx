import * as React from "react";
import { Location, History } from "history";
import { match } from "react-router";
import { State } from "./types";

export type RouteSyncProps = {
  routeProps: Partial<State>;
  children: React.ReactChild;
  setRouteState: (routeProps: Partial<State>) => void;
};

export default class RouteSync extends React.Component<RouteSyncProps> {
  componentWillMount() {
    let { routeProps, setRouteState } = this.props;
    setRouteState(routeProps);
  }

  componentWillReceiveProps(nextProps: RouteSyncProps) {
    let { routeProps, setRouteState } = nextProps;
    if (routeProps !== this.props.routeProps) {
      setRouteState(routeProps);
    }
  }

  render() {
    return this.props.children;
  }
}
