// uTools工具api文件夹

/**
 * @description UTools.getPath
*/
export function getPathUTools(name) {
  return utools.getPath(name)
}

/**
 * @description // 创建数据 utools.db.put 必须有 _id
 * 
*/
export function createStorage(params) {
  return utools.db.put(params)
}

/**
 * @description // 更新存储 utools.db.put 更新需要有_id 和 _rev
 * 
*/
export function upDataStorge(params) {
  return utools.db.put(params)
}

/**
 * @description 获取数据根据_id
*/
export function getStorgeByID(_id) {
  return utools.db.get(_id)
} 

/**
 * @description 添加功能关键词
*/
export function setFeature(params) {
  /**
   * {
    "code": "hosts",
    "explain": "hosts切换",
    // "icon": "res/xxx.png",
    // "icon": "data:image/png;base64,xxx...",
    // "platform": ["win32", "darwin", "linux"]
    "cmds": ["hosts"]
  }
   * 
  */
  utools.setFeature(params)
}

/**
 * @description 删除功能关键词
*/
export function removeFeature(code) {
  utools.removeFeature(code)
}

/**
 * @description 获取key开头的数据
*/
export function allDocs(key) {
  return utools.db.allDocs(key)
}

/**
 * @description 获取所有的feature
 * 
*/
export function getAllFeatures() {
  return utools.getFeatures()
}

/**
 * @description 根据id删除本地数据
 * @param {Staring} id
*/
export function removeStorgeById(id) {
  utools.db.remove(id)
}