import { bundleToComponent } from "redux-arena/tools";
import ArenaSwitchMotion from "./ArenaSwitchMotion";

export default bundleToComponent({
  Component: ArenaSwitchMotion,
  options: {
    vReducerKey: "_arenaSwitchAnimation",
    isSceneReducer: false
  }
});
