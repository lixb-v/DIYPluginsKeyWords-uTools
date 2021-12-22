
import { useReducer, useState } from 'react'
import { 
  HashRouter as Router,
  // Switch, 
  Route,
  Redirect
 } from 'react-router-dom'
import Home from './pages/Home'
import Demo from './pages/Demo'

import { getPluginsPath, isObject } from '@/utils/index'
import { getPluginsDataList } from '@/utils/readFile'
import { getPluginsId, getStoreDataById, getTargetKeyWOrdByPlugsData, filterNoSetting, removeRepeatPluins } from '@/utils/keyWordSetting'
import { allDocs } from '@/utils/uTools'
import { diyStoreKey } from '@/const'
// 引入全局存储
import {  rootInitState, rootReduce } from '@/reducer'
import { RootContext } from '@/reducer/rootContext'

function App() {
  const [state, dispatch] = useReducer(rootReduce, rootInitState)
  utools.onPluginEnter(({code, type, payload, optional}) => {
    // 判断code
    if(code === 'configure'){ // 显示设置页面
      console.log('进入设置页面:',code,type,payload, optional);
      // 获取已配置列表
      const alreadyList = allDocs(diyStoreKey)
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
    }else{// 进入脚本执行
      console.log('进入脚本执行:',code,type,payload, optional);
      // 获取插件id 
      const pluginsId = getPluginsId(code)
      // 获取当前插件diy关键字列表
      const pluinsData = getStoreDataById(pluginsId)
      const cmd = getTargetKeyWOrdByPlugsData(pluinsData, code.split('_')[1])
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
    }
  })

  return (
    <RootContext.Provider value={{state,dispatch}}>
      <div className="App">
        <Router>
            <Route exact path="/">
              <Redirect to="/home/keyWordSetting" />
              {/* <Redirect to="/demo" /> */}
            </Route>
            <Route path="/Home" component={ Home }></Route>
            <Route path="/demo" component={ Demo }></Route>
        </Router>
      </div> 
    </RootContext.Provider>
  )
}

export default App
