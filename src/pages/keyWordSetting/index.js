import { useState } from 'react'
import { Layout, Menu } from 'antd';
import './index.scss'
import MenuList from './components/MenuList'
import ConfigureContent from './components/ConfigureContent'
import { tabHeight } from '@/const'
const { Content, Sider } = Layout;
const getHeight = () => {
  return `calc(100vh - ${tabHeight}px)`
}
function KeyWordSetting(props) {
  return (
   <Layout style={{ background: '#f3f4f6'  }}>
    <Sider
      style={{
        marginTop: '8px',
        overflow: 'auto',
        height: getHeight(),
        position: 'fixed',
        left: 0,
        background: '#fff',
        borderRadius: '6px'
      }}
    >
      <MenuList />
    </Sider>
    <Layout className="site-layout" style={{ marginLeft: 200 }}>
      <Content style={{ margin: '8px', overflow: 'auto', height: getHeight(), background: '#fff', borderRadius: '6px'}}>
        <div className="site-layout-background" style={{ padding: 8 }}>
          <ConfigureContent />
        </div>
      </Content>
    </Layout>
  </Layout>
  );
}

export default KeyWordSetting;
