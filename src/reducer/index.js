import { pluginsInitState, pluginsReducer } from './modules/pluginsReduce'
import { openLocalReducer, openLocalInitState } from './modules/openLocalReduce'
import { mainReducer, mainState } from './modules/mainReduce'
export const rootInitState = {
  mainReducer: mainState,
  pluginsReduce: pluginsInitState,
  openLocalReducer: openLocalInitState,
}

export const rootReduce = (state, action)=>{
  return {
    mainReducer: mainReducer(state.mainReducer, action),
    pluginsReduce: pluginsReducer(state.pluginsReduce, action),
    openLocalReducer: openLocalReducer(state.openLocalReducer, action),
  }
}