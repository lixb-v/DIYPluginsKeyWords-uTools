import { useState, useEffect } from 'react'
import { Card } from 'antd';
import './index.scss'
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'
import keyWordSetting from '@/pages/KeyWordSetting'
import OpenLocal from '@/pages/OpenLocal'
function Home(props) {
  const [ tabKey, setTabKey ] = useState('')
  const tabList = [{
     tab: 'DIY关键字',
     key: '/home/keyWordSetting'
    },
    {
     tab: '快捷资源列表',
     key: '/home/openLocal'
  }]
  useEffect(() => {
    const pathname = props.location.pathname
    setTabKey(pathname)
  }, [props.location.pathname])
  const tabChange = (key) => {
    setTabKey(key)
    props.history.push(key)
  }
  return (
    <Card style={{ width: '100%', height: '100vh', overflow: 'hidden'}} tabList={tabList} activeTabKey={ tabKey } onTabChange={ tabChange }>
      <CacheSwitch>
        <CacheRoute path="/home/keyWordSetting" component={ keyWordSetting } />
        <CacheRoute path="/home/openLocal" component={ OpenLocal } />
      </CacheSwitch>
    </Card>
  )
  }
export default Home