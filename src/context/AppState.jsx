import React, { useReducer } from 'react'
import AppContext from "./AppContext"
import Reducer from './Reducer'

const AppState = (props) => {
    const initialState = {
      allProducts : [],
      currentProduct : {},
      currentDevice : '',
      key : 0
    }
    const reducer = Reducer
    const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <AppContext.Provider value = {{state , dispatch}}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppState