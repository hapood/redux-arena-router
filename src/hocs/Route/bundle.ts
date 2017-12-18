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
    { _arenaScene: actions }: ActionsDict<DefaultSceneActions>
  ): {
    computedMatch?: match<{}>;
    actions: DefaultSceneActions;
  } => ({
    actions
  }),
  options: {
    vReducerKey: "_arenaRoute"
  }
};
