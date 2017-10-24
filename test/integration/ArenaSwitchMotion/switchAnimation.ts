import { spring, presets, PlainStyle } from "react-motion";
import {
  SwitchMotionPhase,
  InitMotionStyle,
  StyleCalculators,
  NextPhaseCheckers,
  NumberToStyles
} from "src";

export const initStyles: InitMotionStyle[] = [
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

export const styleCalculators: StyleCalculators = {
  container: (style: PlainStyle, phase: SwitchMotionPhase) => style,
  oldPlay: (style: PlainStyle, phase: SwitchMotionPhase) => {
    if (phase === SwitchMotionPhase.IN) {
      return {
        left: 0,
        opacity: 1
      };
    } else if (phase === SwitchMotionPhase.LEAVING) {
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
  newPlay: (style: PlainStyle, phase: SwitchMotionPhase) => {
    if (phase === SwitchMotionPhase.ENTERING) {
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

export const nextPhaseCheckers: NextPhaseCheckers = {
  container: () => false,
  oldPlay: (style: PlainStyle) => {
    if (style.phase === SwitchMotionPhase.LEAVING && style.opacity < 0.3) {
      return true;
    }
    if (style.phase === SwitchMotionPhase.OUT) {
      return true;
    }
    return false;
  },
  newPlay: (style: PlainStyle) => {
    if (style.phase === SwitchMotionPhase.ENTERING && style.opacity === 1) {
      return true;
    }
    return false;
  }
};

export const numberToStyles: NumberToStyles = {
  container: (style: PlainStyle, phase: SwitchMotionPhase) => ({}),
  oldPlay: (style: PlainStyle, phase: SwitchMotionPhase) => ({}),
  newPlay: (style: PlainStyle, phase: SwitchMotionPhase) => ({})
};
