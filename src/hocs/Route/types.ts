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
  onMount?: (node: ReactNode) => void;
  onUnmount?: (node: ReactNode) => void;
  onUpdate?: (node: ReactNode) => void;
  isRenderDisabled?: boolean;
} & Props;

export type State = {
  location: Location | undefined;
  match: match<{}> | undefined;
  history: History | undefined;
  exact: boolean | undefined;
  path: string | undefined;
  strict: boolean | undefined;
};
