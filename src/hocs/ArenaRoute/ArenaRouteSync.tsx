import * as React from "react";
import * as H from "history";

export type RouteProps = {
  location: H.Location;
};

export type ArenaRouteSyncProps = {
  routeProps: RouteProps;
  children?: React.ReactElement<{}> | null | undefined;
  setRouteState: (routeProps: RouteProps) => void;
};

export default class ArenaRouteSync extends React.Component<
  ArenaRouteSyncProps
> {
  componentWillMount() {
    let { routeProps, setRouteState } = this.props;
    setRouteState(routeProps);
  }

  componentWillReceiveProps(nextProps: ArenaRouteSyncProps) {
    let { routeProps, setRouteState } = nextProps;
    if (routeProps !== this.props.routeProps) {
      setRouteState(routeProps);
    }
  }

  render() {
    if (this.props.children != null) {
      return this.props.children as React.ReactElement<{}>;
    } else {
      return <div />;
    }
  }
}
