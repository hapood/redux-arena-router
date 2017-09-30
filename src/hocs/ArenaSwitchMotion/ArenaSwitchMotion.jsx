import React, { Component } from "react";
import PropTypes from "prop-types";
import { TransitionMotion } from "react-motion";
import { ENTERING, IN, LEAVING, OUT } from "./animationPhase";
import { calcKeys, buildStyleCalculator, isCurPhaseEnd } from "./utils";

export default class ArenaSwitchAnimation extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    initStyles: PropTypes.array.isRequired,
    styleCalculators: PropTypes.object.isRequired,
    nextPhaseCheckers: PropTypes.object.isRequired,
    numberToStyle: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.actions.playNext();
    let state = {
      initStyles: this.props.initStyles
        .map(styleObj =>
          Object.assign({}, styleObj, {
            style: Object.assign({}, styleObj.style, { phase: IN })
          })
        )
        .concat({
          key: "nextPhase",
          style: { phase: IN }
        })
    };
    Object.assign(state, calcKeys(this.props.newPlayKey));
    state.styleCalculator = buildStyleCalculator(
      this.props.styleCalculators,
      this.props.phase,
      this.props.nextPhaseCheckers,
      phase =>
        setImmediate(() =>
          this.props.actions.nextPhase(
            phase,
            state.oldPlayKey,
            this.props[state.oldPlayKey]
          )
        )
    );
    this.setState(state);
  }

  componentWillReceiveProps(nextProps) {
    let state = Object.assign({}, this.state);
    if (nextProps.newPlayKey !== this.props.newPlayKey) {
      Object.assign(state, calcKeys(nextProps.newPlayKey));
    }
    if (
      nextProps.actions !== this.props.actions ||
      nextProps.phase !== this.props.phase ||
      nextProps.newPlayKey !== this.props.newPlayKey ||
      nextProps.styleCalculators !== this.props.styleCalculators ||
      nextProps.nextPhaseCheckers !== this.props.nextPhaseCheckers
    ) {
      state.styleCalculator = buildStyleCalculator(
        nextProps.styleCalculators,
        nextProps.phase,
        nextProps.nextPhaseCheckers,
        phase =>
          setImmediate(() =>
            nextProps.actions.nextPhase(
              phase,
              state.oldPlayKey,
              nextProps[state.oldPlayKey]
            )
          )
      );
    }
    if (nextProps.initStyles !== this.props.initStyles) {
      let nextPhaseStyle = this.state.initStyles.find(
        style => style.key === "nextPhase"
      );
      state.initStyles = nextProps.initStyles.concat(nextPhaseStyle);
    }
    this.setState(state);
    if (nextProps.phase === IN && nextProps.playlist.length > 0) {
      nextProps.actions.playNext();
    } else if (nextProps.phase === OUT && nextProps.autoClearPlay) {
      nextProps.actions.playNext();
    }
  }

  render() {
    let { phase, numberToStyle } = this.props;
    let { newPlayKey, oldPlayKey } = this.state;
    return (
      <TransitionMotion
        defaultStyles={this.state.initStyles}
        willLeave={this.willLeave}
        styles={this.state.styleCalculator}
      >
        {interpolatedStyles => {
          let containerStyle, newPlayStyle, oldPlayStyle, animationPhase;
          interpolatedStyles.forEach(styleObj => {
            let { key, style } = styleObj;
            switch (key) {
              case "container":
                containerStyle = style;
                break;
              case "oldPlay":
                oldPlayStyle = style;
                break;
              case "newPlay":
                newPlayStyle = style;
                break;
              case "nextPhase":
                animationPhase = style.phase;
                break;
            }
          });
          return (
            <div
              style={numberToStyle("container", containerStyle, animationPhase)}
            >
              {this.props.children}
              <div
                key={oldPlayKey}
                style={numberToStyle("oldPlay", oldPlayStyle, animationPhase)}
              >
                {this.props[oldPlayKey].element}
              </div>
              <div
                key={newPlayKey}
                style={numberToStyle("newPlay", newPlayStyle, animationPhase)}
              >
                {this.props[newPlayKey].element}
              </div>
            </div>
          );
        }}
      </TransitionMotion>
    );
  }
}
