import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Router, Switch } from "react-router-dom";
import { ArenaRoute, ArenaSwitchMotion } from "src";
import * as switchAnimation from "./switchAnimation";

export default class TestHOC extends Component {
  static propTypes = {
    store: PropTypes.any.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    console.log(ArenaRoute)
    let props = this.props;
    return (
      <Provider store={props.store}>
        <Router history={props.history}>
          <ArenaSwitchMotion
            loadingPlay={<div />}
            initStyles={switchAnimation.initStyles}
            styleCalculators={switchAnimation.styleCalculators}
            numberToStyle={switchAnimation.numberToStyle}
            nextPhaseCheckers={switchAnimation.nextPhaseCheckers}
          >
            <Switch reducerKey={props.reducerKey}>
              <ArenaRoute key="1" path="/pageA">
                <div />
              </ArenaRoute>
              <ArenaRoute key="2" path="/pageB">
                <div />
              </ArenaRoute>
            </Switch>
          </ArenaSwitchMotion>
        </Router>
      </Provider>
    );
  }
}
