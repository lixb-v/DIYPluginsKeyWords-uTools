
import { useReducer, useState } from 'react'
import { 
  HashRouter as Router,
  Route,
  Redirect
 } from 'react-router-dom'
 import CacheRoute, { CacheSwitch } from 'react-router-cache-route'
import Home from './pages/Home'
import Demo from './pages/Demo'
// 引入全局存储
import { rootInitState, rootReduce } from '@/reducer'
import { RootContext } from '@/reducer/rootContext'

function App(props) {
  const [ refresh, setRefresh ] = useState(false)
  const [state, dispatch] = useReducer(rootReduce, rootInitState)
  utools.onPluginReady(() => {
    setRefresh(true)
  })
  return (
    <RootContext.Provider value={{state, dispatch}}>
      <div className="App">
        <Router>
          { refresh && <CacheSwitch>
              {/* <Route exact path="/">
                <Redirect to="/home/keyWordSetting" />
              </Route> */}
              <CacheRoute path="/Home" component={ Home }></CacheRoute>
              <Route path="/demo" component={ Demo }></Route>
          </CacheSwitch>}
        </Router>
      </div>
    </RootContext.Provider>
  )
}

export default App
