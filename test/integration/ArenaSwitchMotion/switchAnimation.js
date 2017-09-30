import { spring, presets } from "react-motion";
import { switchMotionPhase } from "src";

export const initStyles = [
  {
    key: "container",
    style: {}
  },
  {
    key: "oldPlay",
    style: {
      opacity: 1,
      left: 0
    }
  },
  {
    key: "newPlay",
    style: {
      opacity: 0,
      left: 15
    }
  }
];

export const styleCalculators = {
  container: (style, phase) => style,
  oldPlay: (style, phase) => {
    if (phase === switchMotionPhase.IN) {
      return {
        left: 0,
        opacity: 1
      };
    } else if (phase === switchMotionPhase.LEAVING) {
      return {
        opacity: spring(0, presets.stiff),
        left: spring(-15, presets.stiff)
      };
    } else {
      return {
        left: 0,
        opacity: 0
      };
    }
  },
  newPlay: (style, phase) => {
    if (phase === switchMotionPhase.ENTERING) {
      return {
        opacity: spring(1, presets.stiff),
        left: spring(0, presets.stiff)
      };
    } else {
      return {
        opacity: 0,
        left: 15
      };
    }
  }
};

export const nextPhaseCheckers = {
  container: () => false,
  oldPlay: style => {
    if (style.phase === switchMotionPhase.LEAVING && style.opacity < 0.3) {
      return true;
    }
    if (style.phase === switchMotionPhase.OUT) {
      return true;
    }
    return false;
  },
  newPlay: style => {
    if (style.phase === switchMotionPhase.ENTERING && style.opacity === 1) {
      return true;
    }
  }
};

export const numberToStyle = (key, style, phase) => {
  switch (key) {
    case "container":
      return {
        width: "400px",
        height: "400px",
        position: "relative"
      };
    case "oldPlay":
      return Object.assign(
        {
          width: "100%",
          height: "100%",
          position: "absolute"
        },
        style,
        { opacity: String(style.opacity), left: style.left + "px" }
      );
    case "newPlay":
      return Object.assign(
        {
          width: "100%",
          height: "100%",
          position: "absolute"
        },
        style,
        { opacity: String(style.opacity), left: style.left + "px" }
      );
    default:
      return style;
  }
};
