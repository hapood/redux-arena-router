import React, { Component } from "react";
import PropTypes from "prop-types";
import { TransitionMotion, spring, presets } from "react-motion";
import { ENTERING, IN, PRE_LEAVE, LEAVING, OUT } from "./anamitionPhase";

function isCurPhaseEnd(
  phase,
  prevStyles,
  isReadyOld,
  isReadyNew,
  nextPhaseCheckers
) {
  return prevStyles.find(styleObj => {
    let { key, style } = styleObj;
    switch (key) {
      case "container":
        return nextPhaseCheckers.container
          ? nextPhaseCheckers.container(phase, style, isReadyOld, isReadyNew)
          : false;
      case "oldPlay":
        return nextPhaseCheckers.oldPlay
          ? nextPhaseCheckers.oldPlay(phase, style, isReadyOld, isReadyNew)
          : false;
      case "newPlay":
        return nextPhaseCheckers.newPlay
          ? nextPhaseCheckers.newPlay(phase, style, isReadyOld, isReadyNew)
          : false;
      default:
        return false;
    }
  }) == null
    ? false
    : true;
}

function calcStylesBuilder(
  phase,
  isReadyOld,
  isReadyNew,
  styleCalcers,
  nextPhaseCheckers,
  nextPhase
) {
  return function(prevStyles) {
    return prevStyles.map(styleObj => {
      let { key, style } = styleObj;
      switch (key) {
        case "container":
          return {
            key: "container",
            style: styleCalcers.container
              ? styleCalcers.container(style, phase, isReadyOld, isReadyNew)
              : style
          };
        case "oldPlay":
          return {
            key: "oldPlay",
            style: styleCalcers.oldPlay
              ? styleCalcers.oldPlay(style, phase, isReadyOld, isReadyNew)
              : style
          };
        case "newPlay":
          return {
            key: "newPlay",
            style: styleCalcers.newPlay
              ? styleCalcers.newPlay(style, phase, isReadyOld, isReadyNew)
              : style
          };
        case "nextPhase":
          if (phase === IN) {
            return {
              key: "nextPhase",
              style: {
                phase
              }
            };
          }
          if (phase !== style.phase) {
            if (
              isCurPhaseEnd(
                phase,
                prevStyles,
                isReadyOld,
                isReadyNew,
                nextPhaseCheckers
              )
            ) {
              nextPhase(phase);
              return {
                key: "nextPhase",
                style: {
                  phase
                }
              };
            }
          }
          return styleObj;
        default:
          return styleObj;
      }
    });
  };
}

export default class ArenaSwitchAnimation extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    defaultStyles: PropTypes.array.isRequired,
    styleCalcers: PropTypes.object.isRequired,
    nextPhaseCheckers: PropTypes.object.isRequired,
    addNumberUnit: PropTypes.func.isRequired
  };
  static defaultProps = {
    defaultStyles: [
      {
        key: "container",
        style: {}
      },
      {
        key: "oldPlay",
        style: {
          opacity: 1
        }
      },
      {
        key: "newPlay",
        style: {
          opacity: 0
        }
      }
    ],
    styleCalcers: {
      container: (style, phase, isReadyOld, isReadyNew) => style,
      oldPlay: (style, phase, isReadyOld, isReadyNew) => {
        if (phase === IN || phase === PRE_LEAVE) {
          return {
            opacity: 1
          };
        } else {
          return {
            opacity: spring(0, presets.stiff)
          };
        }
      },
      newPlay: (style, phase, isReadyOld, isReadyNew) => {
        if (phase !== ENTERING && phase !== PRE_LEAVE) {
          return {
            opacity: 0
          };
        } else {
          return {
            opacity: spring(1, presets.stiff)
          };
        }
      }
    },
    addNumberUnit: (key, style, phase) => {
      switch (key) {
        case "container":
          return {
            width: "400px",
            height: "400px"
          };
        case "oldPlay":
          return Object.assign(
            {
              width: "100%",
              height: "100%",
              display:
                phase === IN || phase === LEAVING || phase === PRE_LEAVE
                  ? "block"
                  : "none"
            },
            style,
            { opacity: String(style.opacity) }
          );
        case "newPlay":
          return Object.assign(
            {
              width: "100%",
              height: "100%",
              display: phase === OUT || phase === ENTERING ? "block" : "none"
            },
            style,
            { opacity: String(style.opacity) }
          );
        default:
          return style;
      }
    },
    nextPhaseCheckers: {
      container: () => false,
      oldPlay: (phase, style, isReadyOld, isReadyNew) => {
        if (phase === PRE_LEAVE) return true;
        if (phase === LEAVING && style.opacity === 0) return true;
        if (phase === OUT && isReadyNew) return true;
        return false;
      },
      newPlay: (phase, style, isReadyOld, isReadyNew) => {
        if (phase === ENTERING && style.opacity === 1) return true;
        return false;
      }
    }
  };
  calcKeys(newPlayKey) {
    if (newPlayKey === "play2")
      return {
        newPlayKey,
        oldPlayKey: "play1",
        oldReadyKey: "isReadyPlay1",
        newReadyKey: "isReadyPlay2"
      };
    else
      return {
        newPlayKey,
        oldPlayKey: "play2",
        oldReadyKey: "isReadyPlay2",
        newReadyKey: "isReadyPlay1"
      };
  }
  componentWillMount() {
    this.props.actions.playNext();
    this.state = {
      defaultStyles: this.props.defaultStyles.concat({
        key: "nextPhase",
        style: { phase: IN }
      })
    };
    Object.assign(this.state, this.calcKeys(this.props.newPlayKey));
    this.state.calcStyles = calcStylesBuilder(
      this.props.phase,
      this.props[this.state.oldReadyKey],
      this.props[this.state.newReadyKey],
      this.props.styleCalcers,
      this.props.nextPhaseCheckers,
      () =>
        setImmediate(() =>
          this.props.actions.nextPhase(
            this.props.phase,
            this.state.oldReadyKey,
            this.props[this.state.oldReadyKey]
          )
        )
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newPlayKey !== this.props.newPlayKey) {
      Object.assign(this.state, this.calcKeys(nextProps.newPlayKey));
    }
    if (
      nextProps.actions !== this.props.actions ||
      nextProps.phase !== this.props.phase ||
      nextProps.newPlayKey !== this.props.newPlayKey ||
      nextProps.isReadyPlay1 !== this.props.isReadyPlay1 ||
      nextProps.isReadyPlay2 !== this.props.isReadyPlay2 ||
      nextProps.styleCalcers !== this.props.styleCalcers ||
      nextProps.nextPhaseCheckers !== this.props.nextPhaseCheckers
    ) {
      this.state.calcStyles = calcStylesBuilder(
        nextProps.phase,
        nextProps[this.state.oldReadyKey],
        nextProps[this.state.newReadyKey],
        nextProps.styleCalcers,
        nextProps.nextPhaseCheckers,
        () =>
          setImmediate(() =>
            nextProps.actions.nextPhase(
              nextProps.phase,
              this.state.oldReadyKey,
              nextProps[this.state.oldReadyKey]
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
      addNumberUnit
    } = this.props;
    let { newPlayKey, oldPlayKey, newReadyKey, oldReadyKey } = this.state;
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
              style={addNumberUnit("container", containerStyle, motionPhase)}
            >
              {this.props.children}
              <div
                key={oldPlayKey}
                style={addNumberUnit("oldPlay", oldPlayStyle, motionPhase)}
              >
                <div
                  style={
                    this.props[oldReadyKey] ? (
                      { width: "100%", height: "100%" }
                    ) : (
                      { display: "none" }
                    )
                  }
                >
                  {this.props[oldPlayKey].element}
                </div>
              </div>
              <div
                key={newPlayKey}
                style={addNumberUnit("newPlay", newPlayStyle, motionPhase)}
              >
                <div
                  style={
                    this.props[newReadyKey] ? (
                      { width: "100%", height: "100%" }
                    ) : (
                      { display: "none" }
                    )
                  }
                >
                  {this.props[newPlayKey].element}
                </div>
              </div>
            </div>
          );
        }}
      </TransitionMotion>
    );
  }
}
