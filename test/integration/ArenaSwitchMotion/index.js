import React from "react";
import { expect } from "chai";
import { spy } from "sinon";
import createHistory from "history/createBrowserHistory";
import { createMount } from "../../testUtils";
import { switchMotionPhase } from "src";
import { createArenaStore } from "redux-arena";
import TestHOC from "./TestHOC";

function selectAnimationState(allStates, name) {
  let animationState;
  Object.keys(allStates).forEach(key => {
    if (allStates[key].phase != null) {
      animationState = allStates[key];
    }
  });
  return animationState;
}

describe("<ArenaSceneMotion /> integration", () => {
  let store, mount, wrapper, history;

  before(() => {
    history = createHistory();
    mount = createMount();
    store = createArenaStore();
  });

  after(() => {
    mount.cleanUp();
    store.close();
  });

  it("should loop phase correctly", () => {
    let queue = [switchMotionPhase.OUT, switchMotionPhase.IN];
    wrapper = mount(<TestHOC store={store} history={history} />);
    let flagPromise = new Promise(resolve => {
      let unsubscribe = store.subscribe(() => {
        let animationState = selectAnimationState(store.getState());
        if (queue.length > 0) {
          if (animationState && queue[0] === animationState.phase) {
            queue.shift();
          }
        } else {
          unsubscribe();
          resolve(true);
        }
      });
    });
    history.push("/pageA")
    return flagPromise;
  });
});
