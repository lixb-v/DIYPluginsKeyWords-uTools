import { getPathUTools } from '@/utils/uTools'

/**
 * @description 获取用户的uTools下的plugins插件路径
*/
export function  getPluginsPath() {
  const appDataPath = getPathUTools('appData')
  const uToolsPath = appDataPath + '\\uTools\\plugins'
  return uToolsPath
}

/**
 * @description 判断是不是对象
*/
export function isObject(data) {
  return (!Array.isArray(data) && typeof data === 'object' )
}