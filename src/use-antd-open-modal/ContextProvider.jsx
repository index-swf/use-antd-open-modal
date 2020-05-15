import React, {
  useReducer,
  useCallback,
} from 'react';
import {
  ACTION, mapReducer, getId, OpenModalContext, initialValue,
} from './common';


const ContextProvider = ({ children }) => {
  const [{ allIds, byId }, dispatch] = useReducer(mapReducer, initialValue);
  const add = useCallback((reactDom) => {
    const id = getId();
    dispatch({ type: ACTION.ADD, payload: { id, value: reactDom } });
    return id;
  }, []);
  const remove = useCallback((id) => {
    dispatch({ type: ACTION.REMOVE, payload: { id } });
  }, []);

  return <OpenModalContext.Provider value={{ add, remove }}>
    {children}
    {allIds.map((key => {
      const Component = byId[key].value;
      return <Component key={key} />;
    }))}
  </OpenModalContext.Provider>;
};

export default ContextProvider;
