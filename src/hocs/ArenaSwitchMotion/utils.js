import { ENTERING, IN, LEAVING, OUT } from "./animationPhase";
export function isCurPhaseEnd(prevStyles, phase, nextPhaseCheckers) {
  return prevStyles.find(styleObj => {
    let { key, style } = styleObj;
    switch (key) {
      case "container":
        return nextPhaseCheckers.container
          ? nextPhaseCheckers.container(style, phase)
          : false;
      case "oldPlay":
        return nextPhaseCheckers.oldPlay
          ? nextPhaseCheckers.oldPlay(style, phase)
          : false;
      case "newPlay":
        return nextPhaseCheckers.newPlay
          ? nextPhaseCheckers.newPlay(style, phase)
          : false;
      default:
        return false;
    }
  }) == null
    ? false
    : true;
}

export function buildStyleCalculator(
  styleCalculators,
  phase,
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
            style: styleCalculators.container
              ? styleCalculators.container(style, phase)
              : style
          };
        case "oldPlay":
          return {
            key: "oldPlay",
            style: styleCalculators.oldPlay
              ? styleCalculators.oldPlay(style, phase)
              : style
          };
        case "newPlay":
          return {
            key: "newPlay",
            style: styleCalculators.newPlay
              ? styleCalculators.newPlay(style, phase)
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
            if (isCurPhaseEnd(prevStyles, phase, nextPhaseCheckers)) {
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

export function calcKeys(newPlayKey) {
  if (newPlayKey === "play2")
    return {
      newPlayKey,
      oldPlayKey: "play1"
    };
  else
    return {
      newPlayKey,
      oldPlayKey: "play2"
    };
}
