import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import ArenaRouteSync from "./ArenaRouteSync";

export default class ArenaRoute extends Component {
  static propTypes = {
    exact: PropTypes.bool,
    path: PropTypes.string,
    strict: PropTypes.bool,
    location: PropTypes.object,
    children: PropTypes.element
  };

  rendToElement(props) {
    let { exact, strict, path, computedMatch, location, actions } = props;
    return (
      <Route
        location={location}
        computedMatch={computedMatch}
        exact={exact}
        path={path}
        strict={strict}
        render={routeProps => {
          return (
            <ArenaRouteSync
              setRouteState={actions.setState}
              routeProps={routeProps}
            >
              {this.props.children}
            </ArenaRouteSync>
          );
        }}
      />
    );
  }

  componentWillMount() {
    let { animationDictItem } = this.props;
    let state = { playElement: this.rendToElement(this.props) };
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

  componentWillReceiveProps(nextProps) {
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
        playElement: this.rendToElement(this.props)
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
