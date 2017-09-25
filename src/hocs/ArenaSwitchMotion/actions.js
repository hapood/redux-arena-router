import { ARENA_SCENE_SET_STATE } from "redux-arena/actionTypes";
import {
  ARENA_SWITCH_ANIMATION_PLAY_ADD,
  ARENA_SWITCH_ANIMATION_PLAY_REMOVE,
  ARENA_SWITCH_ANIMATION_PLAY_NEXT,
  ARENA_SWITCH_ANIMATION_NEXTPRASE
} from "./actionType";

export function setState(state) {
  return {
    type: ARENA_SCENE_SET_STATE,
    state
  };
}

export function nextPhase(phase, oldPlayKey, oldPlay) {
  return { type: ARENA_SWITCH_ANIMATION_NEXTPRASE, phase, oldPlayKey, oldPlay };
}

export function addPlay(element, playId) {
  return {
    type: ARENA_SWITCH_ANIMATION_PLAY_ADD,
    entity: {
      element,
      playId
    }
  };
}

export function removePlay(element) {
  return {
    type: ARENA_SWITCH_ANIMATION_PLAY_REMOVE,
    element
  };
}

export function playNext(element) {
  return {
    type: ARENA_SWITCH_ANIMATION_PLAY_NEXT,
    element
  };
}

export function playLatest(element) {
  return {
    type: ARENA_SWITCH_ANIMATION_PLAY_LATEST,
    element
  };
}
