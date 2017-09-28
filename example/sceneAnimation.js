import { spring, presets } from "react-motion";
import { sceneMotionPhase } from "redux-arena";

export const defaultStyles = [
  {
    key: "container",
    style: {}
  },
  {
    key: "loadingPlay",
    style: {}
  },
  {
    key: "scenePlay",
    style: {
      opacity: 0
    }
  }
];

export const styleCalculators = {
  container: (style, phase) => style,
  loadingPlay: (style, phase) => style,
  scenePlay: (style, phase) => {
    if (phase === sceneMotionPhase.LOADING) {
      return {
        opacity: 0
      };
    } else {
      return {
        opacity: 1
      };
    }
  }
};

export const nextPhaseCheckers = {
  container: () => false,
  loadingPlay: (style, phase, isSceneReady) => {
    if (phase === sceneMotionPhase.LOADING && isSceneReady === true)
      return true;
    return false;
  },
  scenePlay: (phase, style) => {
    if (phase === sceneMotionPhase.ENTERING && style.opacity === 1) return true;
    if (
      phase !== sceneMotionPhase.ENTERING &&
      phase !== sceneMotionPhase.ENTERING
    )
      return true;
    return false;
  }
};

export const numberToStyle = (key, style, phase, isSceneReady) => {
  switch (key) {
    case "container":
      return {
        width: "100%",
        height: "100%"
      };
    case "loadingPlay":
      return {
        width: "100%",
        height: "100%",
        display: phase === sceneMotionPhase.LOADING ? "block" : "none"
      };
    case "scenePlay":
      return Object.assign(
        {
          width: "100%",
          height: "100%",
          display: phase === sceneMotionPhase.LOADING ? "none" : "block"
        },
        style,
        { opacity: String(style.opacity) }
      );
    default:
      return style;
  }
};
