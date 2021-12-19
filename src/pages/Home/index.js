import { useState } from 'react'
import { Tabs, Card } from 'antd';
import './index.scss'
import keyWordSetting from '@/pages/keyWordSetting'
import { Route } from 'react-router-dom'
const { TabPane } = Tabs;
function Home() {
  const [ tabList, setTabList ] = useState([{
    tab: '关键字设置',
    key: 'keyWordSetting',
    route: () => (<Route path="/home/keyWordSetting" component={ keyWordSetting }></Route>)
  }])
    return (
      <Card style={{ width: '100%', margin: 'auto', height: '100vh', overflow: 'hidden' }}>
        <Tabs defaultActiveKey="keyWordSetting">
          { tabList.map(tabItem => (
             <TabPane tab={ tabItem.tab } key={ tabItem.key }>
               { tabItem.route() }
           </TabPane>
          )) } 
        </Tabs>
      </Card>
    )
  }
export default Home