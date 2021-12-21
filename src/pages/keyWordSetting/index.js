import { useState } from 'react'
import { Layout, Empty  } from 'antd';
import './index.scss'
import MenuList from './components/MenuList'
import ConfigureContent from './components/ConfigureContent'
import { tabHeight } from '@/const'
const { Content, Sider } = Layout;
const getHeight = () => {
  return `calc(100vh - ${tabHeight}px)`
}
function KeyWordSetting(props) {
  const [ currentEditPlugins, setCurrentEditPlugins ] = useState({})
  return (
   <Layout style={{ background: '#f3f4f6'  }}>
    <Sider
      style={{
        overflow: 'auto',
        height: getHeight(),
        position: 'fixed',
        left: 0,
        background: '#f3f4f6',
        borderRadius: '6px'
      }}
    >
      <MenuList setCurrentEditPlugins={ (plugins) => { setCurrentEditPlugins(plugins) } }/>
    </Sider>
    <Layout className="site-layout" style={{ marginLeft: 200, position: 'absolute', width: 'calc(100vw - 200px)' }}>
      <Content style={{  background: '#fff', borderRadius: '6px'}}>
        <div className="site-layout-background" style={{ overflow: 'hidden', height: getHeight(), padding: 8 }}>
          { currentEditPlugins.pluginName
            ? <ConfigureContent currentEditPlugins={ currentEditPlugins }/>
            : <Empty description="请选择一个插件进行配置" />
          }
        </div>
      </Content>
    </Layout>
  </Layout>
  );
}

export default KeyWordSetting;
