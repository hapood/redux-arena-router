import * as React from "react";
import * as PropTypes from "prop-types";
import { ReducerDict, ReducerDictItem } from "redux-arena";
import { Route } from "react-router-dom";
import { ReducerDictOverrider } from "redux-arena";
import ArenaRouteSync from "./ArenaRouteSync";
import { ArenaRouteConnectedProps } from "./types";

export type InnerState = {
  animationDictItem: ReducerDictItem;
  playElement: React.ReactElement<{}>;
  isObsolete: boolean;
};

export default class ArenaRoute extends React.Component<
  ArenaRouteConnectedProps,
  InnerState
> {
  static contextTypes = {
    store: PropTypes.any,
    arenaReducerDict: PropTypes.object
  };

  rendToElement(props: ArenaRouteConnectedProps, reducerDict: ReducerDict) {
    let { exact, strict, path, computedMatch, location, actions } = props;
    let routeElem = React.createElement(Route, {
      location,
      computedMatch,
      exact,
      path,
      strict,
      render: (routeProps: any) => (
        <ArenaRouteSync
          setRouteState={actions.setState}
          routeProps={routeProps}
        >
          {this.props.children}
        </ArenaRouteSync>
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
    let { animationDictItem } = this.props;
    let state = {
      playElement: this.rendToElement(
        this.props,
        animationDictItem ? this.context.arenaReducerDict : null
      )
    };
    this.setState(state, () => {
      if (animationDictItem) {
        animationDictItem.actions.addPlay(this.state.playElement);
      }
    });
  }

  componentWillUnmount() {
    let { animationDictItem } = this.props;
    if (animationDictItem) {
      animationDictItem.actions.removePlay(this.state.playElement);
    }
  }

  componentWillReceiveProps(nextProps: ArenaRouteConnectedProps) {
    let { animationDictItem, location } = nextProps;
    if (
      animationDictItem !== this.props.animationDictItem ||
      location !== this.props.location
    ) {
      this.setState({ isObsolete: true });
    }
  }

  componentDidUpdate() {
    if (this.state.isObsolete) {
      let { animationDictItem } = this.props;
      if (animationDictItem) {
        animationDictItem.actions.removePlay(this.state.playElement);
      }
      let state = {
        isObsolete: false,
        playElement: this.rendToElement(
          this.props,
          animationDictItem ? this.context.arenaReducerDict : null
        )
      };
      this.setState(state, () => {
        if (animationDictItem) {
          animationDictItem.actions.addPlay(this.state.playElement);
        }
      });
    }
  }

  render() {
    if (this.props.animationDictItem) {
      return <div />;
    } else {
      return this.state.playElement;
    }
  }
}
