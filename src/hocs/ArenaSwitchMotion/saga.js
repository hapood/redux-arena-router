import {
  takeLatestSceneAction,
  getSceneState,
  setSceneState
} from "redux-arena/effects";
import { ARENA_SWITCH_ANIMATION_PLAY } from "./actionType";
import { INIT, IN } from "./anamitionPhase";
function* nextPhase({ element }) {
  let { phase } = yield getSceneState();
  if (phase === IN || phase === INIT) {
    yield setSceneState({ displaying: element });
  }
}

export default function*() {
  yield takeLatestSceneAction(ARENA_SWITCH_ANIMATION_PLAY, nextPhase);
}
