import { useState } from 'react'
import { Layout, Menu } from 'antd';
import './index.scss'
import MenuList from './components/MenuList'
import ConfigureContent from './components/ConfigureContent'
const { Content, Sider } = Layout;
const getHeight = () => {
  return 'calc(100vh - 46px)'
}
function KeyWordSetting() {
  return (
   <Layout>
    <Sider
      style={{
        marginTop: '8px',
        overflow: 'auto',
        height: getHeight(),
        position: 'fixed',
        left: 0,
        background: '#fff'
      }}
    >
      <MenuList />
    </Sider>
    <Layout className="site-layout" style={{ marginLeft: 200, background: '#f3f4f6' }}>
      <Content style={{ margin: '8px 8px 0', overflow: 'auto', height: getHeight()}}>
        <div className="site-layout-background" style={{ padding: 8 }}>
          <ConfigureContent />
        </div>
      </Content>
    </Layout>
  </Layout>
  );
}

export default KeyWordSetting;
