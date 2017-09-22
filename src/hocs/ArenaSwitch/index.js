import { bundleToComponent } from "redux-arena/helper";
import ArenaSwitch from "./ArenaSwitch";

export default bundleToComponent({
  Component: ArenaSwitch,
  options: {
    vReducerKey: "_arenaSwitch"
  }
});
