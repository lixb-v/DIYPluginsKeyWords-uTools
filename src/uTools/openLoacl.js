
import { SAVEOPENLOCALLISTKEY } from '@/const'

// 获取所有数据
export function getAllFileList(idKey) {
  let allDocs = utools.db.allDocs(idKey || '')
  if(!allDocs || allDocs.length === 0) {return []}
  return allDocs
}

// 存储fileInfo
export function saveFileInfo (fileInfo) {
  utools.db.put({
    _id: fileInfo._id,
    ...fileInfo
  })
}

// 添加feature
export function addFeature (fileInfo) {
  const fetureConfig = {
    "code": fileInfo._id,
    "explain": fileInfo.KeyWord,
    "cmds":[fileInfo.KeyWord]
  }
  utools.setFeature(fetureConfig)
}

// 删除fileInfo
export function deleteFileInfo(id) {
		utools.db.remove(id);
}

// 删除feature
export function deleteFeature(id) {
  utools.removeFeature(id);
}

// 更新fileInfo
export function updataFileInfo(fileInfo) {
  utools.db.bulkDocs([fileInfo])
}

// 以文件形式打开openLocal功能时，存储文件
export function saveOpenLocalList(list) {
  if(!list || list.length <= 0) return
  utools.dbStorage.setItem(SAVEOPENLOCALLISTKEY, list)
}

// 获取以文件形式打开openLocal时，存储的文件
export function getOpenLocalList() {
  const list = utools.dbStorage.getItem(SAVEOPENLOCALLISTKEY)
  return Array.isArray(list) ? list : []
}

// 清楚以文件形式打开openLocal时，存储的文件
export function removeOpenLocalList() {
  utools.dbStorage.removeItem(SAVEOPENLOCALLISTKEY)
}