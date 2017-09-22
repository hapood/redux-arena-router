import { bundleToComponent } from "redux-arena/helper";
import FadeInFadeOut from "./FadeInFadeOut";

export default bundleToComponent({
  Component: FadeInFadeOut,
  propsPicker: (state, actions, allState, { _arenaSwitch }) => ({
    nextDisplay: allState[_arenaSwitch.reducerKey].latestPlay,
    playlist: allState[_arenaSwitch.reducerKey].playlist,
    switchActions: _arenaSwitch.actions
  }),
  options: {
    vReducerKey: "_arenaSwitchAnimation"
  }
});
