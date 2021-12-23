import { useState, useContext, useEffect } from 'react'
import { Layout, Empty, Input } from 'antd';
import './index.scss'
import MenuList from './components/MenuList'
import ConfigureContent from './components/ConfigureContent'
import { RootContext } from '@/reducer/rootContext'
import { getContentHeight, getPluginsPath } from '@/utils/index'
import { getAllDocs } from '@/uTools/api'
import { getPluginsDataList } from '@/utils/readFile'
import { filterNoSetting, removeRepeatPluins } from '@/utils/keyWordSetting'
import { diyStoreKey } from '@/const'

const { Content, Sider } = Layout;
const { Search } = Input;
const searchHeight = 50
function KeyWordSetting(props) {
  const [ currentEditPlugins, setCurrentEditPlugins ] = useState({})
  const { state, dispatch } = useContext(RootContext) // 获取全局的数据
  const [ searchList, setSearchList ] = useState([])
  const [ isSearch, setIsSearch ] = useState(false)
  // 已配置插件
  const [alreadySettingList, setAlreadySettingList] = useState([])
  // 未配置插件
  const [ notSettingList, setNotSettingList ] = useState([])

  useEffect(() => {
    console.log('进入diy页面')
    initData()
  }, [])
 
  // 用户退出插件
  utools.onPluginOut(() => {
    initData()
    setCurrentEditPlugins({})
  })

  const onSearch = (value) => {
    if(!value){
      setIsSearch(false)
      setSearchList([])
      return
    } 
    const pluinsList = [...alreadySettingList, ...notSettingList]
    const filterList = pluinsList.filter(pluinsItem => pluinsItem.pluginName.indexOf(value) !== -1)
    setIsSearch(true)
    setSearchList(filterList)
  }

  // 初始化数据
  const initData = () => {
    // 获取已配置列表
    const alreadyList = getAllDocs(diyStoreKey)
    setAlreadySettingList(alreadyList)
    dispatch({ type: 'setAlreadyList', alreadyList: alreadyList })
    const uToolsPath = getPluginsPath()
    getPluginsDataList(uToolsPath).then(pluginsDataList => {
      pluginsDataList = [...pluginsDataList, pluginsDataList[0], pluginsDataList[2]]
      const removerList = removeRepeatPluins(pluginsDataList)
      dispatch({ type: 'setPluginsList', pluginsList: removerList })
      const resList = filterNoSetting(alreadyList, removerList)
      dispatch({ type: 'setNotSettingList', notSettingList: resList })
      setNotSettingList(resList)
    }) 
  }
  return (
   <Layout style={{ background: '#f3f4f6'  }}>
    <Sider
      style={{
        overflow: 'hidden',
        height: getContentHeight(),
        position: 'fixed',
        left: 0,
        background: '#f3f4f6'
      }}
    >
      <div style={{ 
        paddingTop: searchHeight,
        overflow: 'auto',
        height: '100%'
      }}>
        <div style={{ width: '95%', position: 'absolute', top: 0, height: searchHeight, display: 'flex', padding: 8,  justifyContent: 'center', alignItems: 'center', background: '#f3f4f6', zIndex: 3 }}>
          <Search placeholder="请输入插件名" onSearch={onSearch}  />
        </div>
        
        <MenuList notSettingList={ notSettingList } alreadySettingList={ alreadySettingList } searchList={ searchList } isSearch={ isSearch } setCurrentEditPlugins={ (plugins) => { setCurrentEditPlugins(plugins) } }/>
      </div>
    </Sider>
    <Layout className="site-layout" style={{ marginLeft: 200, position: 'absolute', width: 'calc(100vw - 200px)' }}>
      <Content style={{  background: '#fff', borderRadius: '6px'}}>
        <div className="site-layout-background" style={{ overflow: 'hidden', height: getContentHeight(), padding: 8 }}>
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
