import { spring, presets } from "react-motion";
import { switchMotionPhase } from "redux-arena-router/animationPhase";

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
    if (phase === switchMotionPhase.IN) {
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
    if (phase !== switchMotionPhase.ENTERING) {
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
    if (phase === switchMotionPhase.LEAVING && style.opacity === 0) return true;
    if (phase === switchMotionPhase.OUT) return true;
    return false;
  },
  newPlay: (phase, style) => {
    if (phase === switchMotionPhase.ENTERING && style.opacity === 1)
      return true;
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
          display:
            phase === switchMotionPhase.IN ||
            phase === switchMotionPhase.LEAVING
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
          display:
            phase === switchMotionPhase.OUT ||
            phase === switchMotionPhase.ENTERING
              ? "block"
              : "none"
        },
        style,
        { opacity: String(style.opacity) }
      );
    default:
      return style;
  }
};
