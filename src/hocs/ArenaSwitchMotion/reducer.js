import initState from "./state";
import {
  ARENA_SWITCH_ANIMATION_NEXTPRASE,
  ARENA_SWITCH_ANIMATION_PLAY_ADD,
  ARENA_SWITCH_ANIMATION_PLAY_REMOVE,
  ARENA_SWITCH_ANIMATION_PLAY_NEXT
} from "./actionType";
import { ENTERING, IN, LEAVING, OUT } from "./anamitionPhase";
import { PLAT_LATEST, PLAT_NEXT } from "./playStrategy";

export default function(state = initState, action, sceneReudcerKey) {
  switch (action.type) {
    case ARENA_SCENEBUNDLE_PLAY_START:
      if (state.play1.playId === action.playId) {
        return Object.assign({}, state, { isReadyPlay1: true });
      } else if (state.play2.playId === action.playId) {
        return Object.assign({}, state, { isReadyPlay2: true });
      } else {
        return state;
      }
  }
  if (action._sceneReducerKey !== sceneReducerKey) return state;
  switch (action.type) {
    case ARENA_SWITCH_ANIMATION_NEXTPRASE:
      if (
        action.phase !== state.phase ||
        state[action.oldPlayKey] !== action.oldPlay
      )
        return state;
      switch (state.phase) {
        case ENTERING:
          let newPlayKey, readyKey;
          if (state.newPlayKey === "play2") {
            newPlayKey = "play1";
            readyKey = "isReadyPlay1";
          } else {
            newPlayKey = "play2";
            readyKey = "isReadyPlay2";
          }
          return Object.assign({}, state, {
            phase: IN,
            [state.newPlayKey]: null,
            [readyKey]: false,
            newPlayKey
          });
        case LEAVING:
          return Object.assign({}, state, { phase: OUT });
        case OUT:
          return Object.assign({}, state, { phase: ENTERING });
        default:
          return state;
      }
    case ARENA_SWITCH_ANIMATION_PLAY_NEXT:
      if (
        state.phase !== IN ||
        (state.playlist.length === 0 && state.autoClearPlay == null)
      )
        return state;
      let newState = Object.assign({}, state);
      if (state.autoClearPlay != null) {
        newState.phase = LEAVING;
      }
      if (state.playlist.length > 0) {
        newState.phase = LEAVING;
        newState.isPreEnterEnd = false;
        switch (action.playStrategy) {
          case PLAT_NEXT:
            newState[state.newPlayKey] = state.playlist[0];
            newState.playlist = state.playlist.slice(1);
          default:
            newState[state.newPlayKey] =
              state.playlist[state.playlist.length - 1];
            newState.playlist = [];
        }
      }
      return newState;
    case ARENA_SWITCH_ANIMATION_PLAY_ADD:
      return Object.assign({}, state, {
        playlist: state.playlist.concat(action.entity)
      });
    case ARENA_SWITCH_ANIMATION_PLAY_REMOVE:
      if (state.phase == IN && state.play1 === action.element) {
        return Object.assign({}, state, { phase: LEAVING });
      } else if (state[state.newPlayKey].element === action.element) {
        return Object.assign({}, state, { autoClearPlay: action.element });
      } else {
        return Object.assign({}, state, {
          playlist: state.playlist.filter(
            entity => entity.element !== action.element
          )
        });
      }
    default:
      return state;
  }
}
