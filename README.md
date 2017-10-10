# redux-arena-router-router
[![Build Status](https://travis-ci.org/hapood/redux-arena-router.svg?branch=master)](https://travis-ci.org/hapood/redux-arena-router) 
[![Coverage Status](https://coveralls.io/repos/github/hapood/redux-arena-router/badge.svg?branch=master)](https://coveralls.io/github/hapood/redux-arena-router?branch=master)
[![npm version](https://img.shields.io/npm/v/redux-arena-router.svg?style=flat-square)](https://www.npmjs.com/package/redux-arena-router)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md#pull-requests)

High order components of react-router based on redux-arena-router

## Install

```
npm install redux-arena-router --save
```

## [Example](https://hapood.github.io/redux-arena-router/)

A complete example is under `/example` directory, including a lot of HOC. And add redux-devtools for state changing show.
Online example can be found here: [Here](https://hapood.github.io/redux-arena-router/)


## Quick Start

1. Export ArenaScene high order component for ArenaRoute using.

```javascript
import { bundleToComponent } from "redux-arena/tools";
import state from "./state";
import saga from "./saga";
import * as actions from "./actions";
import PageA from "./PageA";

export default bundleToComponent({
  Component: PageA,
  state,
  saga,
  actions
})
```

2. Pass the ArenaScene high order component as ArenaRoute's children.

```javascript
import React from "react";
import { BrowserRouter, Switch } from "react-router";
import { ArenaRoute } from "redux-arena-router";
import PageA from "./pageA";

export default (props) =>
    (<BrowserRouter>
        <Switch>
            <ArenaRoute>
                <PageA />
            </ArenaRoute>
        </Switch>
    </BrowserRouter>);
```
