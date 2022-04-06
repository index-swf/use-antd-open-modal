/**
 * 一个 map 结构的 reducer generator，从下面的库的代码简化而来
 * https://github.com/adrienjt/redux-data-structures
 */

export const defaultInitialState = {
  byId: {},
  allIds: [],
}

export enum ACTION_TYPE {
  ADD,
  CHANGE,
  REMOVE,
  RESET,
  EMPTY,
}

type ACTION = {
  type: ACTION_TYPE
  payload: {
    id: string
  } & any
}

const mapReducerGenerator = (initialState = defaultInitialState) => (state = initialState, action: ACTION) => {
  const { type } = action
  if (type === ACTION_TYPE.ADD) {
    return add(state, action)
  } else if (type === ACTION_TYPE.CHANGE) {
    return change(state, action)
  } else if (type === ACTION_TYPE.REMOVE) {
    return remove(state, action)
  } else if (type === ACTION_TYPE.RESET) {
    return initialState
  } else if (type === ACTION_TYPE.EMPTY) {
    return defaultInitialState
  } else {
    return state
  }
}

const add = (state: any, action: ACTION) => {
  const key = action.payload.id
  return {
    byId: { ...state.byId, [key]: action.payload },
    allIds: state.allIds.includes(key) ? state.allIds : state.allIds.concat(key),
  }
}

const change = (state: any, action: ACTION) => {
  const itemModifier = (item: any, action: ACTION) => ({
    ...item,
    ...action.payload,
  })
  const key = action.payload.id
  const item = state.byId[key]
  return item === undefined
    ? state
    : {
        byId: { ...state.byId, [key]: itemModifier(item, action) },
        allIds: state.allIds,
      }
}

const remove = (state: any, action: ACTION) => {
  const key = action.payload.id
  const item = state.byId[key]
  if (item === undefined) return state
  const byId = { ...state.byId }
  delete byId[key]
  return {
    byId,
    allIds: state.allIds.filter((x: string) => x !== key),
  }
}

export default mapReducerGenerator
