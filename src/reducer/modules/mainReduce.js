import { SETISWAKE } from '../const'
export const mainState = {
  isWake: false // 当前插件是是唤醒状态
}

export const mainReducer = (state, action) => {
  switch(action.type) {
    case SETISWAKE:
      return {
        ...state,
        isWake: action.value
      }
    break
    default:
    return {...state}
  }
}
