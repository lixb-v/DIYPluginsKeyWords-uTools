import { useState } from 'react'
import { Tabs, Card } from 'antd';
import './index.scss'
import keyWordSetting from '@/pages/keyWordSetting'
import OpenLocal from '@/pages/OpenLocal'
import { Route } from 'react-router-dom'
function Home(props) {
  const [tabKey, setTabKey] = useState('keyWordSetting')
  const [ tabList, setTabList ] = useState([{
    tab: 'diy关键字',
    key: 'keyWordSetting',
    path: '/home/keyWordSetting'
  }])

  // , {
  //   tab: '快捷打开设置',
  //   key: 'openLocal',
  //   path: '/home/openLocal'
  // }
  const tabChange = (key) => {
    setTabKey(key)
    const findItem = tabList.find(tabItem => tabItem.key === key)
    props.history.push(findItem.path || tabList[0].path)
  }
  return (
    <Card style={{ width: '100%', height: '100vh', overflow: 'hidden'}} tabList={tabList} activeTabKey={ tabKey } onTabChange={ tabChange }>
      <Route path="/home/keyWordSetting" component={ keyWordSetting } />
      <Route path="/home/openLocal" component={ OpenLocal } />
    </Card>
  )
  }
export default Home