import { pluginsInitState, pluginsReducer } from './modules/pluginsReduce'
export const rootInitState = {
  pluginsReduce: pluginsInitState
}

export const rootReduce = (state, action)=>{
  return {
    pluginsReduce: pluginsReducer(state.pluginsReduce, action)
  }
}