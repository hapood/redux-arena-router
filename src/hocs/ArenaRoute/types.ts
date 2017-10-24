import { ReactElement } from "react";
import { ReducerDictItem } from "redux-arena";
import { DefaultSceneActions } from "redux-arena";
import { match } from "react-router-dom";
import * as H from "history";

export type ArenaRouteProps = {
  exact?: boolean;
  path?: string;
  strict?: boolean;
  location?: H.Location;
  children?: ReactElement<{}>;
};

export type ArenaRouteConnectedProps = {
  computedMatch?: match<{}>;
  actions: DefaultSceneActions;
  animationDictItem?: ReducerDictItem | null | undefined;
} & ArenaRouteProps;
