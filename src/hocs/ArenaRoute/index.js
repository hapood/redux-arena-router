import { bundleToComponent } from "redux-arena/tools";
import ArenaRoute from "./ArenaRoute";

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
});
