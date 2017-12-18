import { bundleToComponent } from "redux-arena";
import bundle from "./bundle";
import {ReactElement,ReactPortal,StatelessComponent} from 'react'
import {Location} from "history"
import {match} from 'react-router'

export default bundleToComponent(bundle);

export { State, Props } from "./types";
