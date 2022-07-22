import { useState } from 'react';
import { Menu } from 'antd'
import {
  StarOutlined,
  SettingOutlined,
  SearchOutlined
} from '@ant-design/icons';

const setPluginsIcon = (plugins) => {
  return (
    <img style={{ width: 30, height: 30, borderRadius: '50%' }} src={window.readImgToBase64(plugins.logoPath)} alt="" />
  )
}

const MenuTtemStyle = () => {
  return { paddingLeft: 30 }
}
const { SubMenu } = Menu;
function MenuList(props) {
// 分类列表
const [ menuList ] = useState([{
  title: '已配置插件',
  key: 'alreadySetting',
  icon: <StarOutlined />
}, {
  title: '未配置插件',
  key: 'notSetting',
  icon: <SettingOutlined />
}])

const [searchBar, setSearchBar ] = useState({
  title: '搜索结果',
  key: 'searchBar',
  icon: <SearchOutlined />
})


  const editorClick = (pluginInfo) => {
    props.setCurrentEditPlugins(pluginInfo)
  }

  const subMenuTitleRender = (menuItem) => {
    return (
      <div>
        {menuItem.title}
        <span style={{ marginLeft: 5 }}>
          (
            { menuItem.key === 'alreadySetting' && props.alreadySettingList.length }
            { menuItem.key === 'notSetting' && props.notSettingList.length }
            { menuItem.key === 'searchBar' && props.searchList.length }
          )
          </span>
      </div>
    )
  }
  return (
    <Menu  mode="inline" defaultOpenKeys={['alreadySetting', 'notSetting', 'searchBar']}>
      {
        props.isSearch
        ?
        <SubMenu key={ searchBar.key}  icon={ searchBar.icon } title={ subMenuTitleRender(searchBar)} >
          { props.searchList.map((pluginItem) => <Menu.Item style={ MenuTtemStyle() }  icon={ setPluginsIcon(pluginItem) }  onClick={ () => { editorClick(pluginItem) } } key={ 'searchBar' + pluginItem.name + pluginItem.pluginName }>{ pluginItem.pluginName }</Menu.Item> ) }
        </SubMenu> 
        :
        menuList.map(menuItem => (
          <SubMenu key={ menuItem.key } icon={ menuItem.icon } title={ subMenuTitleRender(menuItem) }>
            { menuItem.key === 'alreadySetting' && props.alreadySettingList.map(pluginItem => (
              <Menu.Item style={ MenuTtemStyle() }  icon={ setPluginsIcon(pluginItem) }  onClick={ () => { editorClick(pluginItem) } } key={ 'alreadySetting' + pluginItem.name + pluginItem.pluginName }>{ pluginItem.pluginName }</Menu.Item>
            ))}
            { menuItem.key === 'notSetting' && props.notSettingList.map(pluginItem => (
              <Menu.Item style={ MenuTtemStyle() } icon={ setPluginsIcon(pluginItem) } key={ 'notSetting' + pluginItem.name + pluginItem.pluginName } onClick={ () => { editorClick(pluginItem) } }>{ pluginItem.pluginName }</Menu.Item>
            ))}
          </SubMenu>
        ))
      }
   </Menu>
  );
}

export default MenuList;
