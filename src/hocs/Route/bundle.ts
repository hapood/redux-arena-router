import { ReactNode, ComponentClass, StatelessComponent } from "react";
import { ActionCreatorsMapObject, AnyAction } from "redux";
import Route from "./Route";
import { Props, State } from "./types";
import { DefaultSceneActions, StateDict, ActionsDict } from "redux-arena";
import { match } from "react-router";

export default {
  Component: Route,
  propsPicker: (
    _: StateDict<{}>,
    {
      _arenaScene: actions,
      _arenaSwitchAnimation: animationActions
    }: ActionsDict<
      DefaultSceneActions,
      {
        _arenaSwitchAnimation: {
          addPlay: (node: ReactNode) => void | null | undefined;
          removePlay: (node: ReactNode) => void | null | undefined;
        };
      }
    >
  ): {
    computedMatch?: match<{}>;
    actions: DefaultSceneActions;
    isAnimationOn: boolean;
    addPlay: ((node: ReactNode) => void) | undefined;
    removePlay: ((node: ReactNode) => void) | undefined;
  } =>
    animationActions
      ? {
          actions,
          isAnimationOn: true,
          addPlay: animationActions.addPlay,
          removePlay: animationActions.removePlay
        }
      : {
          actions,
          isAnimationOn: false,
          addPlay: undefined,
          removePlay: undefined
        },
  options: {
    vReducerKey: "_arenaRoute"
  }
};
