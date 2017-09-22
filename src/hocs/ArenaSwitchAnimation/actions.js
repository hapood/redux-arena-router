import { ARENA_SCENE_SET_STATE } from "redux-arena/actionTypes";
import {
  ARENA_SWITCH_ANIMATION_PLAY_ADD,
  ARENA_SWITCH_ANIMATION_PLAY_REMOVE,
  ARENA_SWITCH_ANIMATION_PLAY_REPLACE,
  ARENA_SWITCH_ANIMATION_PLAY_NEXT,
  ARENA_SWITCH_ANIMATION_PLAY_LATEST,
  ARENA_SWITCH_ANIMATION_NEXTPRASE
} from "./actionType";

export function setState(state) {
  return {
    type: ARENA_SCENE_SET_STATE,
    state
  };
}

export function nextPhase() {
  return { type: ARENA_SWITCH_ANIMATION_NEXTPRASE };
}

export function addPlay(element) {
  return {
    type: ARENA_SWITCH_ANIMATION_PLAY_ADD,
    element
  };
}

export function removePlay(element) {
  return {
    type: ARENA_SWITCH_ANIMATION_PLAY_REMOVE,
    element
  };
}

export function replacePlay(oldElement, newElement) {
  return {
    type: ARENA_SWITCH_ANIMATION_PLAY_REPLACE,
    oldElement,
    newElement
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
