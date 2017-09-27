import initState from "./state";
import {
  ARENA_SWITCH_ANIMATION_NEXTPHRASE,
  ARENA_SWITCH_ANIMATION_PLAY_ADD,
  ARENA_SWITCH_ANIMATION_PLAY_REMOVE,
  ARENA_SWITCH_ANIMATION_PLAY_NEXT
} from "./actionType";
import { ENTERING, IN, LEAVING, OUT } from "../../animationPhase";
import { PLAT_LATEST, PLAT_NEXT } from "./playStrategy";

export default function(state = initState, action) {
  switch (action.type) {
    case ARENA_SWITCH_ANIMATION_NEXTPHRASE:
      let { phase, oldPlayKey, oldPlay } = action;
      if (state.phase !== phase || state[oldPlayKey] !== oldPlay) return state;
      switch (state.phase) {
        case ENTERING:
          let newPlayKey;
          if (state.newPlayKey === "play2") {
            newPlayKey = "play1";
          } else {
            newPlayKey = "play2";
          }
          return Object.assign({}, state, {
            phase: IN,
            [newPlayKey]: {},
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
      if (state.playlist.length === 0 && state.autoClearPlay == null)
        return state;
      let newState = Object.assign({}, state);
      if (state.phase === IN) {
        newState.phase = LEAVING;
      } else if (
        (state.phase === OUT || state.phase === IN) &&
        state.autoClearPlay != null
      ) {
        newState.autoClearPlay = null;
      } else {
        return state;
      }
      if (state.playlist.length > 0) {
        if (state.play1.element == null && state.play2.element == null) {
          newState.phase = OUT;
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
