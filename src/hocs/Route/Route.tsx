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
    let { isRenderDisabled, path, exact, strict, onMount } = this.props;
    this.props.actions.setState({
      path,
      exact,
      strict
    });
    let state = {
      playNode: this.rendToElement(
        this.props,
        isRenderDisabled ? this.context.arenaReducerDict : null
      )
    };
    this.setState(state, () => {
      if (onMount) {
        onMount(this.state.playNode);
      }
    });
  }

  componentWillUnmount() {
    let { onUnmount } = this.props;
    if (onUnmount) {
      onUnmount(this.state.playNode);
    }
  }

  componentWillReceiveProps(nextProps: ConnectedProps) {
    let { exact, path, strict, location } = nextProps;
    if (location !== this.props.location) {
      this.setState({ isObsolete: true });
    }
    if (
      path !== this.props.path ||
      exact !== this.props.exact ||
      strict !== this.props.strict
    ) {
      this.props.actions.setState({
        path,
        exact,
        strict
      });
    }
  }

  componentDidUpdate() {
    if (this.state.isObsolete) {
      let { isRenderDisabled, onUpdate } = this.props;
      let oldPlayNode = this.state.playNode;
      let state = {
        isObsolete: false,
        playNode: this.rendToElement(
          this.props,
          isRenderDisabled ? this.context.arenaReducerDict : null
        )
      };
      this.setState(state, () => {
        if (onUpdate) {
          onUpdate(oldPlayNode, this.state.playNode);
        }
      });
    }
  }

  render() {
    if (this.props.isRenderDisabled) {
      return <div />;
    } else {
      return this.state.playNode;
    }
  }
}
