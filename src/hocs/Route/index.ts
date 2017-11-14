import { Location } from "history";
import { bundleToComponent } from "redux-arena";
import bundle from "./bundle";

export default bundleToComponent(bundle);

export { State, Props } from "./types";
