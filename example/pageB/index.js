import { asyncBundleToElement } from "redux-arena/tools";
const bundle = import("./bundle");

export default asyncBundleToElement(bundle);
