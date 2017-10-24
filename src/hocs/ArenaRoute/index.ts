import { SFC } from "react";
import { bundleToComponent } from "redux-arena/tools";
import ArenaRoute from "./ArenaRoute";
import { ArenaRouteProps } from "./types";

export default bundleToComponent({
  Component: ArenaRoute,
  propsPicker: (state, actions, allState, arenaReducerDict) => ({
    actions,
    arenaReducerDict,
    animationDictItem: arenaReducerDict._arenaSwitchAnimation
  }),
  options: {
    vReducerKey: "_arenaRoute"
  }
}) as SFC<ArenaRouteProps>;
