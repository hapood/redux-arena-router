import * as React from "react";
import * as PropTypes from "prop-types";
import { ReducerDict } from "redux-arena";
import { Route } from "react-router-dom";
import { ReducerDictOverrider } from "redux-arena";
import RouteSync from "./RouteSync";
import { ConnectedProps } from "./types";

export type InnerState = {
  playNode: React.ReactChild;
  isObsolete: boolean;
};

export default class ArenaRoute extends React.Component<
  ConnectedProps,
  InnerState
> {
  static contextTypes = {
    store: PropTypes.any,
    arenaReducerDict: PropTypes.object
  };

  rendToElement(props: ConnectedProps, reducerDict: ReducerDict) {
    let { exact, strict, path, computedMatch, location, actions } = props;
    let routeElem = React.createElement(Route, {
      location,
      computedMatch,
      exact,
      path,
      strict,
      render: (routeProps: any) => (
        <RouteSync setRouteState={actions.setState} routeProps={routeProps}>
          {this.props.children}
        </RouteSync>
      )
    });
    if (reducerDict) {
      return (
        <ReducerDictOverrider reducerDict={reducerDict}>
          {routeElem}
        </ReducerDictOverrider>
      );
    } else {
      return routeElem;
    }
  }

  componentWillMount() {
    let { isAnimationOn, addPlay } = this.props;
    let state = {
      playNode: this.rendToElement(
        this.props,
        isAnimationOn ? this.context.arenaReducerDict : null
      )
    };
    this.setState(state, () => {
      if (isAnimationOn) {
        addPlay(this.state.playNode);
      }
    });
  }

  componentWillUnmount() {
    let { isAnimationOn, removePlay } = this.props;
    if (isAnimationOn) {
      removePlay(this.state.playNode);
    }
  }

  componentWillReceiveProps(nextProps: ConnectedProps) {
    let { location } = nextProps;
    if (location !== this.props.location) {
      this.setState({ isObsolete: true });
    }
  }

  componentDidUpdate() {
    if (this.state.isObsolete) {
      let { isAnimationOn, removePlay, addPlay } = this.props;
      if (isAnimationOn) {
        removePlay(this.state.playNode);
      }
      let state = {
        isObsolete: false,
        playNode: this.rendToElement(
          this.props,
          isAnimationOn ? this.context.arenaReducerDict : null
        )
      };
      this.setState(state, () => {
        if (isAnimationOn) {
          addPlay(this.state.playNode);
        }
      });
    }
  }

  render() {
    if (this.props.isAnimationOn) {
      return <div />;
    } else {
      return this.state.playNode;
    }
  }
}
