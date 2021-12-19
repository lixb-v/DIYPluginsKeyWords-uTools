
import { 
  HashRouter as Router,
  // Switch,
  Route,
  Redirect
 } from 'react-router-dom'
import Home from './pages/Home'
import Demo from './pages/Demo'
function App() {
  return (
    <div className="App">
      <Router>
          <Route exact path="/">
            <Redirect to="/home/keyWordSetting" />
          </Route>
          <Route path="/Home" component={ Home }></Route>
          <Route path="/demo" component={ Demo }></Route>
      </Router>
    </div>
  )
}

export default App
