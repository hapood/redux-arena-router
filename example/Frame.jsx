import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Router, Link } from "react-router-dom";
import { ArenaSwitchAnimation, RouteScene } from "redux-arena-router";
import pageABundle from "./pageA";

const asyncPageBBundle = import("./PageB");

export default class Frame extends Component {
  render() {
    let { cnt, addCnt, clearCnt } = this.props;
    return (
      <div>
        <Router history={this.props.history}>
          <div>
            <ul>
              <li>
                <Link to="/redux-arena/PageA">PageA</Link>
              </li>
              <li>
                <Link to="/redux-arena/PageB">PageB</Link>
              </li>
              <li>
                <Link to="/redux-arena/passDownStateAndActions">
                  Pass Down State And Actions
                </Link>
              </li>
              <li>
                <Link to="/redux-arena/moduleReUse">Module Re-Use</Link>
              </li>
            </ul>
            <hr />
            <div>
              <div style={{ marginTop: "1rem" }}>
                <ArenaSwitchAnimation>
                  <Switch>
                    <RouteScene
                      path="/redux-arena/pageA"
                      sceneBundle={pageABundle}
                    />
                    <RouteScene
                      path="/redux-arena/pageB"
                      asyncSceneBundle={asyncPageBBundle}
                    />
                  </Switch>
                </ArenaSwitchAnimation>
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}
