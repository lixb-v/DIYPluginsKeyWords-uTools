export const appInitState = {
  version:'0.0.1',
  appName:'test'
}
export const appReducer=(state, action)=>{
  switch(action.type){
    case 'changeName':
      return {
        ...state,
        appName:action.name
      }
    case 'changeVersion':
      return {
        ...state,
        version:action.version
      }
    default:
      return {...state}
  }
}