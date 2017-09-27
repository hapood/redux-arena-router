import { bundleToComponent } from "redux-arena/tools";
import { withRouter } from "react-router-dom";
import ArenaSwitchMotion from "./ArenaSwitchMotion";
import * as actions from "./actions";
import reducer from "./reducer";

export default withRouter(bundleToComponent({
  Component: ArenaSwitchMotion,
  actions,
  reducer,
  options: {
    vReducerKey: "_arenaSwitchAnimation"
  }
}));
