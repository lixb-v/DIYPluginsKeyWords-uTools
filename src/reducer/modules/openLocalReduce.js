export const openLocalInitState = {
  setOpenLocalFiles: []
}

export const openLocalReducer = (state, action) => {
  switch(action.type){
    case 'setLocalOpenFiles':
      return {
        ...state,
        setOpenLocalFiles: action.fileList
      }
    default:
      return {...state}
  }
}
