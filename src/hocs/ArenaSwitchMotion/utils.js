import { ENTERING, IN, LEAVING, OUT } from "./animationPhase";
export function isCurPhaseEnd(prevStyles, nextPhaseCheckers) {
  return prevStyles.find(styleObj => {
    let { key, style } = styleObj;
    switch (key) {
      case "container":
        return nextPhaseCheckers.container
          ? nextPhaseCheckers.container(style)
          : false;
      case "oldPlay":
        return nextPhaseCheckers.oldPlay
          ? nextPhaseCheckers.oldPlay(style)
          : false;
      case "newPlay":
        return nextPhaseCheckers.newPlay
          ? nextPhaseCheckers.newPlay(style)
          : false;
      default:
        return false;
    }
  }) == null
    ? false
    : true;
}

function calcStyle(style, phase, calculator) {
  return Object.assign({}, calculator ? calculator(style, phase) : style, {
    phase
  });
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
            style: calcStyle(style, phase, styleCalculators.container)
          };
        case "oldPlay":
          return {
            key: "oldPlay",
            style: calcStyle(style, phase, styleCalculators.oldPlay)
          };
        case "newPlay":
          return {
            key: "newPlay",
            style: calcStyle(style, phase, styleCalculators.newPlay)
          };
        case "nextPhase":
          if (isCurPhaseEnd(prevStyles, nextPhaseCheckers)) {
            nextPhase(style.phase);
          }
          return {
            key: "nextPhase",
            style: {
              phase
            }
          };
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
