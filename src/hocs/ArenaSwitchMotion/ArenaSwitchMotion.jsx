import React, { Component } from "react";
import PropTypes from "prop-types";
import { PRE_ENTER, ENTERING, IN, LEAVING, OUT } from "./anamitionPhase";

export default class ArenaSwitchAnimation extends Component {
  static propTypes = {
    containerStyleCalcer: PropTypes.object.isRequired,
    oldPlayStyleCalcer: PropTypes.func.isRequired,
    newPlayStyleCalcer: PropTypes.func.isRequired,
    nextPhaseCaller: PropTypes.func.isRequired
  };
  static defaultProps = {
    containerStyleCalcer: () => ({}),
    oldPlayStyleCalcer: () => ({}),
    newPlayStyleCalcer: () => ({}),
    nextPhaseCaller: () => false
  };
  componentWillMount() {
    this.state = {};
    this.props.actions.nextPlay();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.phase === IN &&
      (nextProps.playlist.length > 0 || nextProps.autoClearPlay)
    ) {
      this.props.actions.nextPlay();
    }
  }

  render() {
    let {
      newPlayKey,
      phase,
      actions,
      containerStyleCalcer,
      oldPlayStyleCalcer,
      newPlayStyleCalcer
    } = this.props;
    if (this.props[newPlayKey === "play2" ? "play1" : "play2"] == null) {
      return <div />;
    }
    let oldPlayKey, oldReadyKey, newReadyKey;
    if (newPlayKey === "play2") {
      oldPlayKey = "play1";
      oldReadyKey = "isReadyPlay1";
      newReadyKey = "isReadyPlay2";
    } else {
      oldPlayKey = "play2";
      oldReadyKey = "isReadyPlay2";
      newReadyKey = "isReadyPlay1";
    }
    return (
      <TransitionMotion
        willLeave={this.willLeave}
        styles={prevStyles => [
          {
            key: "container",
            style: containerStyleCalcer(
              prevStyles,
              phase,
              this.props[oldReadyKey],
              this.props[newReadyKey]
            )
          },
          {
            key: "oldPlay",
            style: containerStyleCalcer(
              prevStyles,
              phase,
              this.props[oldReadyKey],
              this.props[newReadyKey]
            )
          },
          {
            key: "newPlay",
            style: containerStyleCalcer(
              prevStyles,
              phase,
              this.props[oldReadyKey],
              this.props[newReadyKey]
            )
          },
          {
            key: "void",
            style: nextPhaseCaller(prevStyles, phase, () =>
              setImmediate(actions.nextPhase)
            )
          }
        ]}
      >
        {interpolatedStyles => {
          return (
            <div style={interpolatedStyles[0]}>
              <div key={oldPlayKey} style={{ ...interpolatedStyles[1].style }}>
                {this.prop[oldPlayKey]}
              </div>
              <div key={newPlayKey} style={{ ...interpolatedStyles[2].style }}>
                {this.prop[oldPlayKey]}
              </div>
            </div>
          );
        }}
      </TransitionMotion>
    );
  }
}
