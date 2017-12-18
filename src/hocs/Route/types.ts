import { ReactNode, ReactChild } from "react";
import { ReducerDictItem } from "redux-arena";
import { DefaultSceneActions } from "redux-arena";
import { match } from "react-router-dom";
import { Location } from "history";

export type Props = {
  exact?: boolean;
  path?: string;
  strict?: boolean;
  location?: Location;
  children: ReactChild;
};

export type ConnectedProps = {
  computedMatch?: match<{}>;
  actions: DefaultSceneActions;
  isAnimationOn: boolean;
  addPlay: (node: ReactNode) => void;
  removePlay: (node: ReactNode) => void;
} & Props;

export type State = {
  location: Location|undefined;
  match: match<{}>|undefined;
  history: History|undefined;
  exact: boolean|undefined;
  path: string|undefined;
  strict: boolean|undefined;
};
