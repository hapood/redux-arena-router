import initState from "./state";
import {
  ARENA_SWITCH_ANIMATION_NEXTPHRASE,
  ARENA_SWITCH_ANIMATION_PLAY_ADD,
  ARENA_SWITCH_ANIMATION_PLAY_REMOVE,
  ARENA_SWITCH_ANIMATION_PLAY_NEXT
} from "./actionType";
import { ARENA_SCENEBUNDLE_PLAY_START } from "redux-arena/actionTypes";
import { ENTERING, IN, PRE_LEAVE, LEAVING, OUT } from "./anamitionPhase";
import { PLAT_LATEST, PLAT_NEXT } from "./playStrategy";

export default function(state = initState, action, sceneReducerKey) {
  switch (action.type) {
    case ARENA_SCENEBUNDLE_PLAY_START:
      if (state.play1.playId === action.notifyData.playId) {
        return Object.assign({}, state, { isReadyPlay1: true });
      } else if (state.play2.playId === action.notifyData.playId) {
        return Object.assign({}, state, { isReadyPlay2: true });
      } else {
        return state;
      }
  }
  if (action._sceneReducerKey !== sceneReducerKey) return state;
  switch (action.type) {
    case ARENA_SWITCH_ANIMATION_NEXTPHRASE:
      let { phase, oldPlayKey, oldPlay } = action;
      if (state.phase !== phase || state[oldPlayKey] !== oldPlay) return state;
      switch (state.phase) {
        case ENTERING:
          let newPlayKey, oldReadyKey, newReadyKey;
          if (state.newPlayKey === "play2") {
            newPlayKey = "play1";
            newReadyKey = "isReadyPlay1";
            oldReadyKey = "isReadyPlay2";
          } else {
            newPlayKey = "play2";
            newReadyKey = "isReadyPlay2";
            oldReadyKey = "isReadyPlay2";
          }
          return Object.assign({}, state, {
            phase: IN,
            [newPlayKey]: {},
            [newReadyKey]: true,
            [oldReadyKey]: state[newReadyKey],
            newPlayKey
          });
        case PRE_LEAVE:
          return Object.assign({}, state, { phase: LEAVING });
        case LEAVING:
          return Object.assign({}, state, { phase: OUT });
        case OUT:
          return Object.assign({}, state, { phase: ENTERING });
        default:
          return state;
      }
    case ARENA_SWITCH_ANIMATION_PLAY_NEXT:
      if (state.playlist.length === 0 && state.autoClearPlay == null)
        return state;
      let newState = Object.assign({}, state);
      if (state.phase === IN) {
        newState.phase = PRE_LEAVE;
      } else if (
        (state.phase === OUT || state.phase === IN) &&
        state.autoClearPlay != null
      ) {
        newState.autoClearPlay = null;
      } else {
        return state;
      }
      if (state.playlist.length > 0) {
        if (state.newPlayKey === "play2") {
          newState.isReadyPlay2 = false;
        } else {
          newState.isReadyPlay1 = false;
        }
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
        return Object.assign({}, state, { phase: PRE_LEAVE });
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
