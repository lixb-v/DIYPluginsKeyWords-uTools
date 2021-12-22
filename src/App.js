
import { useReducer, useState } from 'react'
import UToolsClass from '@/uTools/index'
import { 
  HashRouter as Router,
  // Switch, 
  Route,
  Redirect
 } from 'react-router-dom'
import Home from './pages/Home'
import Demo from './pages/Demo'

// 引入全局存储
import {  rootInitState, rootReduce } from '@/reducer'
import { RootContext } from '@/reducer/rootContext'

function App() {
  const [state, dispatch] = useReducer(rootReduce, rootInitState)
  UToolsClass.onPluginEnter(dispatch)

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
