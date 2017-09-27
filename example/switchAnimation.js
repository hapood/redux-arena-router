import { spring, presets } from "react-motion";
import { ENTERING, IN, LEAVING, OUT } from "redux-arena-router/animationPhase";

export const defaultStyles = [
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
];

export const styleCalculators = {
  container: (style, phase) => style,
  oldPlay: (style, phase) => {
    if (phase === IN) {
      return {
        opacity: 1
      };
    } else {
      return {
        opacity: spring(0, presets.stiff)
      };
    }
  },
  newPlay: (style, phase) => {
    if (phase !== ENTERING) {
      return {
        opacity: 0
      };
    } else {
      return {
        opacity: spring(1, presets.stiff)
      };
    }
  }
};

export const nextPhaseCheckers = {
  container: () => false,
  oldPlay: (phase, style) => {
    if (phase === LEAVING && style.opacity === 0) return true;
    if (phase === OUT) return true;
    return false;
  },
  newPlay: (phase, style) => {
    if (phase === ENTERING && style.opacity === 1) return true;
    return false;
  }
};

export const numberToStyle = (key, style, phase) => {
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
          display: phase === IN || phase === LEAVING ? "block" : "none"
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
};
