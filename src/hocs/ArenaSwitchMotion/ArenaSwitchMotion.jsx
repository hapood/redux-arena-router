import React, { Component } from "react";
import PropTypes from "prop-types";
import { PRE_ENTER, ENTERING, IN, LEAVING, OUT } from "./anamitionPhase";

export default class ArenaSwitchAnimation extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    containerStyleCalcer: PropTypes.object.isRequired,
    oldPlayStyleCalcer: PropTypes.func.isRequired,
    newPlayStyleCalcer: PropTypes.func.isRequired,
    nextPhaseChecker: PropTypes.func.isRequired,
    emptyElement: PropTypes.element,
    loadingElement: PropTypes.element
  };
  static defaultProps = {
    containerStyleCalcer: () => ({}),
    oldPlayStyleCalcer: () => ({}),
    newPlayStyleCalcer: () => ({}),
    nextPhaseChecker: (prevStyles, phase, nextPhase) => {
      if (phase !== IN) nextPhase();
    },
    emptyElement: <div />,
    loadingElement: <div />
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
              this.props[oldPlayKey] == null,
              this.props[oldReadyKey],
              this.props[newReadyKey]
            )
          },
          {
            key: "oldPlay",
            style: containerStyleCalcer(
              prevStyles,
              phase,
              this.props[oldPlayKey] == null,
              this.props[oldReadyKey],
              this.props[newReadyKey]
            )
          },
          {
            key: "newPlay",
            style: containerStyleCalcer(
              prevStyles,
              phase,
              this.props[oldPlayKey] == null,
              this.props[oldReadyKey],
              this.props[newReadyKey]
            )
          },
          {
            key: "void",
            style: nextPhaseChecker(prevStyles, phase, () =>
              setImmediate(() =>
                actions.nextPhase(phase, oldPlayKey, this.props[oldPlayKey])
              )
            )
          }
        ]}
      >
        {interpolatedStyles => {
          return (
            <div style={interpolatedStyles[0]}>
              {this.props.children}
              <div key={oldPlayKey} style={{ ...interpolatedStyles[1].style }}>
                {this.props[oldReadyKey] ? (
                  this.props[oldPlayKey].element || this.props.emptyElement
                ) : (
                  this.props.loadingElement
                )}
              </div>
              <div key={newPlayKey} style={{ ...interpolatedStyles[2].style }}>
                {this.props[newReadyKey] ? (
                  this.props[newPlayKey].element
                ) : (
                  this.props.loadingElement
                )}
              </div>
            </div>
          );
        }}
      </TransitionMotion>
    );
  }
}
