import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Switch, Link } from "react-router-dom";
import { ArenaSwitchMotion, ArenaRoute } from "redux-arena-router";
import { ArenaSceneMotion } from "redux-arena";
import * as switchAnimation from "./switchAnimation";
import * as sceneAnimation from "./sceneAnimation";
import pageA from "./pageA";
import pageB from "./pageB";
import LoadingPage from "./LoadingPage";

export default class Frame extends Component {
  withSceneAnimation(sceneElemet) {
    return (
      <ArenaSceneMotion
        loadingPlay={<LoadingPage />}
        initStyles={sceneAnimation.initStyles}
        styleCalculators={sceneAnimation.styleCalculators}
        numberToStyle={sceneAnimation.numberToStyle}
        nextPhaseCheckers={sceneAnimation.nextPhaseCheckers}
      >
        {sceneElemet}
      </ArenaSceneMotion>
    );
  }
  render() {
    let { cnt, addCnt, clearCnt } = this.props;
    return (
      <div>
        <BrowserRouter history={this.props.history}>
          <div>
            <ul>
              <li>
                <Link to="/redux-arena-router/PageA">PageA</Link>
              </li>
              <li>
                <Link to="/redux-arena-router/PageB">PageB</Link>
              </li>
            </ul>
            <hr />
            <div>
              <div style={{ marginTop: "1rem" }}>
                <ArenaSwitchMotion
                  initStyles={switchAnimation.initStyles}
                  styleCalculators={switchAnimation.styleCalculators}
                  numberToStyle={switchAnimation.numberToStyle}
                  nextPhaseCheckers={switchAnimation.nextPhaseCheckers}
                >
                  <Switch>
                    <ArenaRoute key="1" path="/redux-arena-router/pageA">
                      {this.withSceneAnimation(pageA)}
                    </ArenaRoute>
                    <ArenaRoute key="2" path="/redux-arena-router/pageB">
                      {this.withSceneAnimation(pageB)}
                    </ArenaRoute>
                  </Switch>
                </ArenaSwitchMotion>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
