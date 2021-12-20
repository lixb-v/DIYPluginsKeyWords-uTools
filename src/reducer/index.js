import {appReducer, appInitState} from './modules/appReduce'
import { pluginsInitState, pluginsReducer } from './modules/pluginsReduce'
export const rootInitState = {
  pluginsReduce: pluginsInitState,
  appReduce: appInitState
}

export const rootReduce = (state, action)=>{
  return {
    appReduce: appReducer(state.appReduce, action),
    pluginsReduce: pluginsReducer(state.pluginsInitState, action)
  }
}