import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Switch, Link } from "react-router-dom";
import { ArenaSwitchMotion, ArenaRoute } from "redux-arena-router";
import {
  defaultStyles,
  styleCalculators,
  numberToStyle,
  nextPhaseCheckers
} from "./switchAnimation";
import pageABundle from "./pageA";

const asyncPageBBundle = import("./PageB");

export default class Frame extends Component {
  render() {
    let { cnt, addCnt, clearCnt } = this.props;
    return (
      <div>
        <BrowserRouter history={this.props.history}>
          <div>
            <ul>
              <li>
                <Link to="/redux-arena/PageA">PageA</Link>
              </li>
              <li>
                <Link to="/redux-arena/PageB">PageB</Link>
              </li>
            </ul>
            <hr />
            <div>
              <div style={{ marginTop: "1rem" }}>
                <ArenaSwitchMotion
                  defaultStyles={defaultStyles}
                  styleCalculators={styleCalculators}
                  numberToStyle={numberToStyle}
                  nextPhaseCheckers={nextPhaseCheckers}
                >
                  <Switch>
                    <ArenaRoute
                      path="/redux-arena/pageA"
                      sceneBundle={pageABundle}
                    />
                    <ArenaRoute
                      path="/redux-arena/pageB"
                      asyncSceneBundle={asyncPageBBundle}
                    />
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
