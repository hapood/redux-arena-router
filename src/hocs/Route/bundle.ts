import { ReactNode } from "react";
import { ActionCreatorsMapObject } from "redux";
import Route from "./Route";
import { Props, State } from "./types";
import { DefaultSceneActions } from "redux-arena";

export default {
  Component: Route,
  propsPicker: (
    _:any,
    {
      _arenaScene: actions,
      _arenaSwitchAnimation: animationActions
    }: {
      _arenaScene: DefaultSceneActions;
      _arenaSwitchAnimation: {
        addPlay: (node: ReactNode) => void | null | undefined;
        removePlay: (node: ReactNode) => void | null | undefined;
      };
    }
  ) =>
    animationActions
      ? {
          actions,
          animationActions,
          isAnimationOn: true,
          addPlay: animationActions.addPlay,
          removePlay: animationActions.removePlay
        }
      : {
          actions,
          animationActions,
          isAnimationOn: false,
          addPlay:undefined,
          removePlay: undefined
        },
  options: {
    vReducerKey: "_arenaRoute"
  }
}
