import { useState, useContext, useEffect } from 'react';
import { RootContext } from '@/reducer/rootContext'
import { allDocs } from '@/utils/uTools'
import { filterNoSetting } from '@/utils/keyWordSetting'
import { Menu, Tag } from 'antd'
import { diyStoreKey } from '@/const'
import {
  StarOutlined,
  SettingOutlined
} from '@ant-design/icons';

const setPluginsIcon = (plugins) => {
  return (
    <img style={{ width: 30, height: 30, borderRadius: '50%' }} src={plugins.logoPath} alt={ plugins.pluginName }/>
  )
}

const MenuTtemStyle = () => {
  return { paddingLeft: 30 }
}
const { SubMenu } = Menu;
function MenuList(props) {
  const [ notSettingList, setNotSettingList ] = useState([])
  // 已配置插件
  const [alreadySettingList, setAlreadySettingList] = useState([])
  
  const {state, dispatch} = useContext(RootContext) // 获取全局的数据

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
  useEffect(() => {
    const { alreadyList, notSettingList } = state.pluginsReduce
    setAlreadySettingList(alreadyList) 
    setNotSettingList(notSettingList)
  }, [state.pluginsReduce])

  const editorClick = (pluginInfo) => {
    props.setCurrentEditPlugins(pluginInfo)
  }

  const subMenuTitleRender = (menuItem) => {
    return (
      <div>
        {menuItem.title}
        <span style={{ marginLeft: 5 }}>({ menuItem.key === 'alreadySetting' && alreadySettingList.length }{ menuItem.key === 'notSetting' && notSettingList.length })</span>
      </div>
    )
  }
  return (
    <Menu  mode="inline" defaultOpenKeys={['alreadySetting', 'notSetting']}>
    { menuList.map(menuItem => (
      <SubMenu key={ menuItem.key } icon={ menuItem.icon } title={ subMenuTitleRender(menuItem) }>
        { menuItem.key === 'alreadySetting' && alreadySettingList.map(pluginItem => (
          <Menu.Item style={ MenuTtemStyle() }  icon={ setPluginsIcon(pluginItem) }  onClick={ () => { editorClick(pluginItem) } } key={ 'alreadySetting' + pluginItem.name + pluginItem.pluginName }>{ pluginItem.pluginName }</Menu.Item>
        ))}
        { menuItem.key === 'notSetting' && notSettingList.map(pluginItem => (
          <Menu.Item style={ MenuTtemStyle() } icon={ setPluginsIcon(pluginItem) } key={ 'notSetting' + pluginItem.name + pluginItem.pluginName } onClick={ () => { editorClick(pluginItem) } }>{ pluginItem.pluginName }</Menu.Item>
        ))}
      </SubMenu>
    )) }
   </Menu>
  );
}

export default MenuList;
