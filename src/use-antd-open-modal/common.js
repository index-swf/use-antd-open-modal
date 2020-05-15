import React from 'react';
import { map } from 'redux-data-structures';


export const ACTION = {
  ADD: Symbol('add'),
  REMOVE: Symbol('remove'),
};

export const initialValue = {
  byId: {},
  allIds: [],
};

export const mapReducer = map({
  addActionTypes: [ACTION.ADD],
  removeActionTypes: [ACTION.REMOVE],
  // keyGetter: action => action.payload.id,
  // itemGetter: action => action.payload,
  // itemModifier: (item, action) => ({ ...item, ...action.payload }),
});

let id = 0;

export const getId = () => id += 1;

export const OpenModalContext = React.createContext();
