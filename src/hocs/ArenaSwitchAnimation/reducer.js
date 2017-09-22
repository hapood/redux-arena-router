import initState from "./state";
import {
  ARENA_SWITCH_ANIMATION_NEXTPRASE,
  ARENA_SWITCH_ANIMATION_PLAY_LATEST,
  ARENA_SWITCH_ANIMATION_PLAY_NEXT,
  ARENA_SWITCH_ANIMATION_PLAY_ADD,
  ARENA_SWITCH_ANIMATION_PLAY_REPLACE,
  ARENA_SWITCH_ANIMATION_PLAY_REMOVE
} from "./actionType";
import { INIT, ENTERING, IN, LEAVING, OUT } from "./anamitionPhase";

export default function(state = initState, action) {
  switch (action.type) {
    case ARENA_SWITCH_ANIMATION_NEXTPRASE:
      switch (state.phase) {
        case INIT:
          return Object.assign({}, state, { phase: IN });
        case ENTERING:
          return Object.assign({}, state, { phase: IN });
        case IN:
          return Object.assign({}, state, { phase: LEAVING });
        case LEAVING:
          return Object.assign({}, state, { phase: OUT });
        case OUT:
          return Object.assign({}, state, { phase: ENTERING });
      }
    case ARENA_SWITCH_ANIMATION_PLAY_LATEST:
      return state.playlist.length > 0
        ? Object.assign({}, state, {
            playlist: [],
            latestPlay: state.playlist[state.playlist.length]
          })
        : state;
    case ARENA_SWITCH_ANIMATION_PLAY_NEXT:
      return state.playlist.length > 0
        ? Object.assign({}, state, {
            playlist: state.playlist.slice(1),
            latestPlay: state.playlist[0]
          })
        : state;
    case ARENA_SWITCH_ANIMATION_PLAY_ADD:
      return Object.assign({}, state, {
        playlist: state.playlist.concat(action.element)
      });
    case ARENA_SWITCH_ANIMATION_PLAY_REPLACE:
      let newState = Object.assign({}, state),
        resetFlag = false;
      if (state.oldPlay === action.oldElement) {
        newState.oldPlay = null;
        resetFlag = true;
      }
      if (state.newPlay === action.oldElement) {
        newState.newPlay = null;
        resetFlag = true;
      }
      if (resetFlag) {
        newState.playlist = state.playlist.concat(action.newElement);
        newState.phase = IN;
      } else {
        newState.playlist = state.playlist
          .filter(element !== action.oldElement)
          .concat(action.newElement);
      }
      return newState;
    case ARENA_SWITCH_ANIMATION_PLAY_REMOVE:
      let newState = Object.assign({}, state),
        resetFlag = false;
      if (state.oldPlay === action.element) {
        newState.oldPlay = null;
        resetFlag = true;
      }
      if (state.newPlay === action.element) {
        newState.newPlay = null;
        resetFlag = true;
      }
      if (resetFlag) {
        newState.phase = IN;
      } else {
        newState.playlist = state.playlist.filter(
          element !== action.oldElement
        );
      }
      return newState;
    default:
      return state;
  }
}
