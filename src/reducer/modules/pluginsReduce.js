export const pluginsInitState = {
  pluginsList: []
}

export const pluginsReducer = (state, action) => {
  switch(action.type){
    case 'setPluginsList':
      return {
        ...state,
        pluginsList: action.pluginsList
      }
    default:
      return {...state}
  }
}