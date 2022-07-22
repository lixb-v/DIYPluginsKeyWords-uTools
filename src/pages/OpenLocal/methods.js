import { KEYWORD, CREATETIME, FILELIST, ISENABLED, ISSYNC, FILEPATH, FILENAME } from './const'
import { convertDate } from '@/utils/index'
// 根据文件生成表单信息
export function createFormDataByFileList(list) {
  if(!list || list.length === 0) return
  const fileList = list.map(item => {
    return {
      [FILENAME]: item.name,
      [FILEPATH]: item.path
    }
  })
  return {
    [KEYWORD]: '',
    [CREATETIME]: convertDate(),
    [FILELIST]: fileList,
    [ISENABLED]: true,
    [ISSYNC]: false
  }
}