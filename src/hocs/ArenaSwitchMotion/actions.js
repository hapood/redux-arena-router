import { ARENA_SCENE_SET_STATE } from "redux-arena/actionTypes";
import {
  ARENA_SWITCH_ANIMATION_PLAY_ADD,
  ARENA_SWITCH_ANIMATION_PLAY_REMOVE,
  ARENA_SWITCH_ANIMATION_PLAY_NEXT,
  ARENA_SWITCH_ANIMATION_NEXTPHRASE
} from "./actionTypes";

export function setState(state) {
  return {
    type: ARENA_SCENE_SET_STATE,
    state
  };
}

export function nextPhase(phase, oldPlayKey, oldPlay) {
  return {
    type: ARENA_SWITCH_ANIMATION_NEXTPHRASE,
    phase,
    oldPlayKey,
    oldPlay
  };
}

export function addPlay(element) {
  return {
    type: ARENA_SWITCH_ANIMATION_PLAY_ADD,
    entity: {
      element
    }
  };
}

export function removePlay(element) {
  return {
    type: ARENA_SWITCH_ANIMATION_PLAY_REMOVE,
    element
  };
}

export function playNext(playStrategy) {
  return {
    type: ARENA_SWITCH_ANIMATION_PLAY_NEXT,
    playStrategy
  };
}
