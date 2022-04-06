import { DrawerProps } from 'antd/lib/drawer'
import { ModalProps } from 'antd/lib/modal'
import React, { useReducer, useCallback } from 'react'
import mapGenerator, { ACTION_TYPE, defaultInitialState } from './map-reducer-generator'

let id = 0
const getId = () => (id += 1)

const mapReducer = mapGenerator()

type OpenModalContextType = {
  add: (reactNode: React.ReactNode) => number
  remove: (id: number) => void
}

type UseAntdOpenModal<ModalOptions = any> = () => (
  innerReactDom: React.ReactElement,
  modalOptions?: ModalOptions,
  additionalOptions?: {
    beforeClose?: () => Promise<void>
  }
) => Promise<void>

export type OpenModalCallbacks = {
  onSuccess?: (result?: any) => void
  onCancel?: () => void
  onError?: (error?: any) => void
  onResetOptions?: (options?: any) => void
}

export type UseOpenModalType = UseAntdOpenModal<ModalProps>
export type UseOpenDrawerType = UseAntdOpenModal<DrawerProps>

export const OpenModalContext = React.createContext({} as OpenModalContextType)

export const defaultOption = {}
export const defaultBeforeClose = () => Promise.resolve()

const InnerContextProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const [{ allIds, byId }, dispatch] = useReducer(mapReducer, defaultInitialState)
  const add = useCallback((reactDom: React.ReactNode) => {
    const id = getId()
    dispatch({ type: ACTION_TYPE.ADD, payload: { id, value: reactDom } })
    return id
  }, [])
  const remove = useCallback(id => {
    dispatch({ type: ACTION_TYPE.REMOVE, payload: { id } })
  }, [])

  return (
    <OpenModalContext.Provider value={{ add, remove }}>
      {children}
      {allIds.map((key: string) => {
        const Component = byId[key].value
        return <Component key={key} />
      })}
    </OpenModalContext.Provider>
  )
}

export const ModalContextProvider = React.memo(InnerContextProvider)
