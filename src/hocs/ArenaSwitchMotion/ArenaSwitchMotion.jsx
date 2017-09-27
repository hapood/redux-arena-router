import React, { Component } from "react";
import PropTypes from "prop-types";
import { TransitionMotion } from "react-motion";
import { ENTERING, IN, LEAVING, OUT } from "../../animationPhase";
import { calcKeys, buildStyleCalculator, isCurPhaseEnd } from "./utils";

export default class ArenaSwitchAnimation extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    defaultStyles: PropTypes.array.isRequired,
    styleCalculators: PropTypes.object.isRequired,
    nextPhaseCheckers: PropTypes.object.isRequired,
    numberToStyle: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.actions.playNext();
    this.state = {
      defaultStyles: this.props.defaultStyles.concat({
        key: "nextPhase",
        style: { phase: IN }
      })
    };
    Object.assign(this.state, calcKeys(this.props.newPlayKey));
    this.state.calcStyles = buildStyleCalculator(
      this.props.phase,
      this.props.styleCalculators,
      this.props.nextPhaseCheckers,
      () =>
        setImmediate(() =>
          this.props.actions.nextPhase(
            this.props.phase,
            this.state.oldPlayKey,
            this.props[this.state.oldPlayKey]
          )
        )
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newPlayKey !== this.props.newPlayKey) {
      Object.assign(this.state, calcKeys(nextProps.newPlayKey));
    }
    if (
      nextProps.actions !== this.props.actions ||
      nextProps.phase !== this.props.phase ||
      nextProps.newPlayKey !== this.props.newPlayKey ||
      nextProps.styleCalculators !== this.props.styleCalculators ||
      nextProps.nextPhaseCheckers !== this.props.nextPhaseCheckers
    ) {
      this.state.calcStyles = buildStyleCalculator(
        nextProps.phase,
        nextProps.styleCalculators,
        nextProps.nextPhaseCheckers,
        () =>
          setImmediate(() =>
            nextProps.actions.nextPhase(
              nextProps.phase,
              this.state.oldPlayKey,
              nextProps[this.state.oldPlayKey]
            )
          )
      );
    }
    if (nextProps.defaultStyles !== this.props.defaultStyles) {
      let nextPhaseStyle = this.state.defaultStyles.find(
        style => style.key === "nextPhase"
      );
      this.state.defaultStyles = nextProps.defaultStyles.concat(nextPhaseStyle);
    }
    if (
      (nextProps.phase === IN || nextProps.phase === OUT) &&
      (nextProps.playlist.length > 0 || nextProps.autoClearPlay)
    ) {
      this.props.actions.playNext();
    }
  }

  render() {
    let {
      phase,
      actions,
      containerStyleCalcer,
      oldPlayStyleCalcer,
      newPlayStyleCalcer,
      nextPhaseCheckers,
      numberToStyle
    } = this.props;
    let { newPlayKey, oldPlayKey } = this.state;
    return (
      <TransitionMotion
        defaultStyles={this.state.defaultStyles}
        willLeave={this.willLeave}
        styles={this.state.calcStyles}
      >
        {interpolatedStyles => {
          let containerStyle, newPlayStyle, oldPlayStyle, motionPhase;
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
                motionPhase = style.phase;
                break;
            }
          });
          return (
            <div
              style={numberToStyle("container", containerStyle, motionPhase)}
            >
              {this.props.children}
              <div
                key={oldPlayKey}
                style={numberToStyle("oldPlay", oldPlayStyle, motionPhase)}
              >
                {this.props[oldPlayKey].element}
              </div>
              <div
                key={newPlayKey}
                style={numberToStyle("newPlay", newPlayStyle, motionPhase)}
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
