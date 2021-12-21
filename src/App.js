
import { useReducer } from 'react'
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
import { getPluginsId, getStoreDataById, getTargetKeyWOrdByPlugsData } from '@/utils/keyWordSetting'
// 引入全局存储
import {  rootInitState, rootReduce } from '@/reducer'
import { RootContext } from '@/reducer/rootContext'
function App() {
  const [state, dispatch] = useReducer(rootReduce, rootInitState)
  utools.onPluginEnter(({code, type, payload, optional}) => {
    // 判断code
    if(code === 'configure'){ // 显示设置页面
      console.log('进入设置页面:',code,type,payload, optional);
      const uToolsPath = getPluginsPath()
      getPluginsDataList(uToolsPath).then(pluginsDataList => {
        dispatch({ type: 'setPluginsList', pluginsList: pluginsDataList })
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
        console.log(cmd, '跳转成功')
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
