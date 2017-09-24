import { bundleToComponent } from "redux-arena/helper";
import ArenaSwitchMotion from "./ArenaSwitchMotion";

export default bundleToComponent({
  Component: ArenaSwitchMotion,
  options: {
    vReducerKey: "_arenaSwitchAnimation"
  }
});
