import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { ArenaScene } from "redux-arena";
import arenaRouteSync from "./arenaRouteSync";

export default class ArenaRoute extends Component {
  static propTypes = {
    reducerKey: PropTypes.string,
    vReducerKey: PropTypes.string,
    asyncSceneBuldle: PropTypes.any,
    sceneBundle: PropTypes.any,
    sceneProps: PropTypes.object,
    isNotifyOn: PropTypes.bool,
    notifyData: PropTypes.object,
    exact: PropTypes.bool,
    path: PropTypes.string,
    strict: PropTypes.bool
  };

  static defaultProps = {
    isNotifyOn: true,
    exact: true
  };

  rendToElement(props, ArenaSceneHOC, playId) {
    let {
      exact,
      strict,
      path,
      computedMatch,
      location,
      notifyData,
      isNotifyOn,
      reducerKey,
      vReducerKey,
      asyncSceneBundle,
      sceneBundle,
      sceneProps,
      arenaReducerDict
    } = props;
    return (
      <Route
        location={location}
        computedMatch={computedMatch}
        exact={exact}
        path={path}
        strict={strict}
        render={routeProps => {
          return React.createElement(ArenaSceneHOC, {
            isNotifyOn,
            notifyData: Object.assign({}, routeProps, notifyData, {
              arenaReducerDict,
              playId
            }),
            reducerKey,
            vReducerKey,
            asyncSceneBundle,
            sceneBundle,
            sceneProps
          });
        }}
      />
    );
  }

  componentWillMount() {
    let { actions, animationDictItem } = this.props;
    this.state = {
      ArenaSceneHOC: arenaRouteSync(ArenaScene, actions.setState),
      isObsolete: false
    };
    let symbol = Symbol(
      Math.random()
        .toString()
        .slice(2, 10)
    );
    if (animationDictItem) {
      this.state.playElement = this.rendToElement(
        this.props,
        this.state.ArenaSceneHOC,
        symbol
      );
      animationDictItem.actions.addPlay(this.state.playElement, symbol);
    }
  }

  componentWillUnmount() {
    let { animationDictItem } = this.props;
    if (animationDictItem) {
      animationDictItem.actions.removePlay(this.state.playElement);
    }
  }

  componentWillReceiveProps(nextProps) {
    let { actions, animationDictItem } = nextProps;
    if (actions !== this.props.actions) {
      this.state.ArenaSceneHOC = arenaRouteSync(ArenaScene, actions.setState);
      this.state.isObsolete = true;
    }
    if (
      animationDictItem !== this.props.animationDictItem ||
      nextProps.location !== this.props.location
    ) {
      this.state.isObsolete = true;
    }
  }

  componentDidUpdate() {
    if (this.state.isObsolete) {
      this.state.isObsolete = false;
      let { animationDictItem } = this.props;
      if (animationDictItem) {
        animationDictItem.actions.removePlay(this.state.playElement);
      }
      let symbol = Symbol(
        Math.random()
          .toString()
          .slice(2, 10)
      );
      this.state.playElement = this.rendToElement(
        this.props,
        this.state.ArenaSceneHOC,
        symbol
      );
      if (animationDictItem) {
        animationDictItem.actions.addPlay(this.state.playElement, symbol);
      }
    }
  }

  render() {
    if (this.props.animationDictItem) {
      return <div />;
    } else {
      return this.rendToElement(this.props, this.state.ArenaSceneHOC);
    }
  }
}
