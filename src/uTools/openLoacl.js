
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