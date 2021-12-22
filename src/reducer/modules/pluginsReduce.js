export const pluginsInitState = {
  pluginsList: [], // 所有插件
  alreadyList: [], // 已经配置插件
  notSettingList: [] // 未配置插件
}

export const pluginsReducer = (state, action) => {
  switch(action.type){
    case 'setPluginsList':
      return {
        ...state,
        pluginsList: action.pluginsList
      }
    case 'setAlreadyList':
      return {
        ...state,
        alreadyList: action.alreadyList
      }
    case 'setNotSettingList':
      return {
        ...state,
        notSettingList: action.notSettingList
      }
    default:
      return {...state}
  }
}