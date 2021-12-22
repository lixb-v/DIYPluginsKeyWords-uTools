import { splitSymbol, diyStoreKey, openLoaclKey } from '@/const'
import { syncOpenFile, asynchronousOpenFile } from '@/utils/index'
import { getPluginsPath, isObject } from '@/utils/index'
import { getPluginsDataList } from '@/utils/readFile'
import { getPluginsId, getStoreDataById, getTargetKeyWOrdByPlugsData, filterNoSetting, removeRepeatPluins } from '@/utils/keyWordSetting'
import { getAllDocs, getStorgeByID } from '@/uTools/api'
class UtoolsClass {
  construction() {}
  onPluginEnter(dispatch) {
    utools.onPluginEnter(({code, type, payload, optional}) => {
      console.log('用户打开插件:',code,type,payload, optional);
      const codeList = code.split(splitSymbol)
      const codeKey = codeList[0]
      switch(codeKey) {
        case 'configure':
        // 获取已配置列表
        const alreadyList = getAllDocs(diyStoreKey)
        dispatch({ type: 'setAlreadyList', alreadyList: alreadyList })
        const uToolsPath = getPluginsPath()
        getPluginsDataList(uToolsPath).then(pluginsDataList => {
          pluginsDataList = [...pluginsDataList, pluginsDataList[0], pluginsDataList[2]]
          const removerList = removeRepeatPluins(pluginsDataList)
          dispatch({ type: 'setPluginsList', pluginsList: removerList })
          const resList = filterNoSetting(alreadyList, removerList)
          dispatch({ type: 'setNotSettingList', notSettingList: resList })
          //每次进入需要设置一下窗口的高度 获取当前窗口的高度
          const windowHeight = document.documentElement.clientHeight
          utools.setExpendHeight(windowHeight)
        }) 
        break
        case diyStoreKey:
          // 获取插件id 
          const pluginsId = getPluginsId(code)
          // 获取当前插件diy关键字列表
          const pluinsData = getStoreDataById(pluginsId)
          const cmd = getTargetKeyWOrdByPlugsData(pluinsData, codeList[2])
          if(cmd) {
            // 跳转插件
            if(isObject(cmd)) {
              utools.redirect(cmd.label, cmd.label)
            } else {
              utools.redirect(cmd)
            }
            // console.log(cmd, '跳转成功')
          } else { 
            console.log(cmd, '跳转失败')
            utools.outPlugin()
          }
        break
        case openLoaclKey:
          // console.log('进入打开本地资源脚本执行:',code,type,payload, optional);
          const doc = getStorgeByID(code);
          utools.hideMainWindow();
          utools.outPlugin();
          if(doc.isSync) {
            // 同步
            syncOpenFile(doc.fileList)
          } else {
            // 异步
            asynchronousOpenFile(doc.fileList)
          }
        break
        default:
  
      }
    })
  }
}

export default new UtoolsClass()