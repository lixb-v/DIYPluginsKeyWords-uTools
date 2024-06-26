import { getPathUTools } from '@/uTools/api'
import { splitSymbol, tabHeight } from '@/const'

/**
 * @description 获取用户的uTools下的plugins插件路径
*/
export function  getPluginsPath() {
  const appDataPath = getPathUTools('userData')
  const uToolsPath = appDataPath + '\/plugins'
  console.log(uToolsPath, 'appDataPathappDataPath');
  return uToolsPath
}

/**
 * @description 判断是不是对象
*/
export function isObject(data) {
  return (!Array.isArray(data) && typeof data === 'object' )
}

/**
 * @description 时间转换
 * @param { Date } 日期对象
 * @return yy-mm-dd
*/

export function convertDate(date = new Date()) {
  // 获取年
  const year = date.getFullYear()
  // 获取月
  const month = date.getMonth() + 1
  // 获取日
  const day = date.getDate()
  return year + '-' + month + '-' + day
}

/**
 * @description 同步打开文件
*/
export function syncOpenFile(fileList) {
  const openList = fileList.map(item => {
    // 判断是不是http地址
    const fullPath = item.filePath || item.fullPath
    if(isHttp(fullPath)) {
      return () => window.openHttpAddress(fullPath)
    } else {
      return () => window.openItem(fullPath)
    }
    
  })
  const perform = (list, index) => {
    if(index === list.length) return
    list[index]().then(res => {
      console.log(index, 'index');
      index++
      perform(list, index)
    })
  }
  perform(openList, 0)
} 
 
/**
 * @description 异步打开文件
*/
export function asynchronousOpenFile(fileList) {
  const openList = fileList.map(item => {
    // 判断是不是http地址
    const fullPath = item.filePath || item.fullPath
    if(isHttp(fullPath)) {
      return window.openHttpAddress(fullPath)
    } else {
      return window.openItem(fullPath)
    }
  })
  Promise.all(openList)
}

/**
 * @description 生成id值
 * @param { String } id开头字符
 * @param { String } 关键字
 * @return { String }
*/
export function generateId(key, KeyWord) {
  return key + splitSymbol + KeyWord
}

/**
 * @description 判断是不是Http地址
*/

export function isHttp(path) {
  return path.substr(0, 4) === 'http'
}

/**
 * // 获取去除tab栏后的高度
*/
export function getContentHeight() {
  return `calc(100vh - ${tabHeight}px)`
}

/**
 * @description 更改窗口的地址栏后面的路由
*/
export function changeWindowHref(routePath) {
  const windowhref = window.location.href
  const markIndex = windowhref.indexOf('#')
  if(markIndex === -1) return
  const spliceHref = windowhref.slice(0, markIndex + 1)
  window.location.href = spliceHref + routePath
}

/**
 * @description 把url后的参数转换为对象
 * @param{String} search
 * @return {Object}
 * 
*/
export function locationSearchToObj(search) {
  if(!search) return {}
  // 去除问号
  if(search[0] == '?') {
    search = search.replace('?', '')
  }
  const arr = search.split('&')
  const resObj = {}
  arr.forEach(item => {
    const itemArr = item.split('=')
    resObj[itemArr[0]] = itemArr[1]
  })
  return resObj
}