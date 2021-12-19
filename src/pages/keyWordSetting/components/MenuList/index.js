import { useState } from 'react';
import { Menu } from 'antd'
import {
  StarOutlined,
  SettingOutlined
} from '@ant-design/icons';
const { SubMenu } = Menu;
function SideBar() {
  // 分类列表
  const [ menuList, setMenuList ] = useState([{
    title: '已配置插件',
    key: 'alreadySetting',
    icon: <StarOutlined />
  }, {
    title: '未配置插件',
    key: 'notSetting',
    icon: <SettingOutlined />
  }])

  // 已配置插件
  const [alreadySetting, setAlreadySetting] = useState([{
    pluginName: '资源搜索',
    key: '资源搜索',
    logo: ''
  }])

  // 未配置插件
  const [ notSetting, setNotSetting ] = useState([{
    pluginName: '斗图',
    key: '斗图',
    logo: ''
  }])
  return (
    <Menu  mode="inline">
    { menuList.map(menuItem => (
      <SubMenu key={ menuItem.key } icon={ menuItem.icon } title={ menuItem.title }>
        { menuItem.key === 'alreadySetting' && alreadySetting.map(pluginItem => (
          <Menu.Item key={ pluginItem.pluginName }>{ pluginItem.pluginName }</Menu.Item>
        ))}
        { menuItem.key === 'notSetting' && notSetting.map(pluginItem => (
          <Menu.Item key={ pluginItem.pluginName }>{ pluginItem.pluginName }</Menu.Item>
        ))}
      </SubMenu>
    )) }
   </Menu>
  );
}

export default SideBar;
