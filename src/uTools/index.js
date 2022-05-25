import { splitSymbol, diyStoreKey, openLoaclKey } from '@/const'
import { syncOpenFile, asynchronousOpenFile, changeWindowHref } from '@/utils/index'
import { isObject } from '@/utils/index'
import { getPluginsId, getStoreDataById, getTargetKeyWOrdByPlugsData } from '@/utils/keyWordSetting'
import { getStorgeByID } from '@/uTools/api'
utools.onPluginEnter(({code, type, payload, optional}) => {
  console.log('用户打开插件:',code,type,payload, optional);
  //每次进入需要设置一下窗口的高度 获取当前窗口的高度
  const windowHeight = document.documentElement.clientHeight
  utools.setExpendHeight(windowHeight)
  const codeList = code.split(splitSymbol)
  const codeKey = codeList[0]
  console.log(codeKey, 'codeKeycodeKey');
  switch(codeKey) {
    case 'configure':
    changeWindowHref('/home/keyWordSetting')
    break
    case 'open':
    changeWindowHref('/home/openLocal')
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