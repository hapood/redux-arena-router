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

  rendToElement(props, ArenaSceneHOC) {
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
              arenaReducerDict
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
      ArenaSceneHOC: arenaRouteSync(ArenaScene, actions.setState)
    };
    if (animationDictItem) {
      this.state.playElement = this.rendToElement(
        this.props,
        this.state.ArenaSceneHOC
      );
      animationDictItem.actions.addPlay(this.state.playElement);
    }
  }

  componentWillUnmount() {
    let { animationDictItem } = this.props;
    if (animationDictItem) {
      animationDictItem.actions.removePlay(this.state.playElement);
    }
  }

  componentWillReceiveProps(nextProps) {
    let { actions,animationDictItem } = nextProps;
    if (actions !== this.props.actions) {
      this.state.ArenaSceneHOC = arenaRouteSync(ArenaScene, actions.setState);
    }
  }

  componentDidUpdate() {
    let { animationDictItem } = this.props;
    this.state.playElement = this.rendToElement(
      this.props,
      this.state.ArenaSceneHOC
    );
    if (animationDictItem) {
      animationDictItem.actions.replacePlay(this.state.playElement);
    }
  }

  render() {
    if (this.props.animationDictItem) {
      return <div />;
    } else {
      this.rendToElement(this.props, this.state.ArenaSceneHOC);
    }
  }
}
