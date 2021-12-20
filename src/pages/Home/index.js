import { useState } from 'react'
import { Tabs, Card } from 'antd';
import './index.scss'
import keyWordSetting from '@/pages/keyWordSetting'
import { Route } from 'react-router-dom'
import { tabHeight } from '@/const'
const { TabPane } = Tabs;
function Home() {
  const [ tabList, setTabList ] = useState([{
    tab: '关键字设置',
    key: 'keyWordSetting'
  }])
    return (
      <Card style={{ width: '100%', margin: 'auto', height: '100vh', overflow: 'hidden' }} tabList={tabList} activeTabKey="keyWordSetting">
        {/* <Tabs defaultActiveKey="keyWordSetting" style={{ height: tabHeight }}>
          { tabList.map(tabItem => (
             <TabPane tab={ tabItem.tab } key={ tabItem.key }>
               { tabItem.route() }
             </TabPane>
          )) } 
        </Tabs> */}
        <Route path="/home/keyWordSetting" component={ keyWordSetting } />
      </Card>
    )
  }
export default Home