import { useEffect, useState } from 'react';
import { Card, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import './index.scss'
import SingleSetting from './SingleSetting'
import { diyField, diyStoreKey, splitSymbol } from '@/const'
import { createStorage, upDataStorge, setFeature, removeFeature, getAllFeatures, removeStorgeById} from '@/uTools/api'
import { disposeFeatures, filterFetureById, generateFeatureParams, generatePluinsId, generateFeatureCode } from '@/utils/keyWordSetting'
const renderTitle = (PluginsInfo) => {
  return (
    <div className="plugins_setting_header">
      <img className="logo" src={ PluginsInfo.logoPath} alt=""/>
      <div className="info">
        <div className="pluginName">{ PluginsInfo.pluginName }</div>
        <div className="author"><span className="info_title">开发者: </span>{PluginsInfo.author}</div>
      </div>
    </div>
  )
}
function ConfigureContent(props) {
  const [ diyKeyWordList, setDiyKeyWordList ] = useState([])
  const [ targetKeyWordList, setTargetKeyWordList ] = useState([])
  useEffect(() => {
    // console.log(props.currentEditPlugins, 'props.currentEditPlugins')
    setDiyKeyWordList([])
    setTargetKeyWordList([])
    if(props.currentEditPlugins.diyList && props.currentEditPlugins.diyList.length > 0) {
      setDiyKeyWordList(props.currentEditPlugins.diyList)
    }
    
    // 处理插件的关键字
    const featureList = disposeFeatures(props.currentEditPlugins.features)
    setTargetKeyWordList(featureList)
  }, [props.currentEditPlugins])

  // 添加按钮点击
  const addDiyList = () => {
    setDiyKeyWordList([...diyKeyWordList, { ...diyField }])
  }

  // diy数据发生改变
  const diyDataChange = (diyData, diyIndex) => {
    diyKeyWordList[diyIndex] = { ...diyData }
    setDiyKeyWordList([...diyKeyWordList])
    props.currentEditPlugins.diyList = diyKeyWordList
  }

  // 添加或更新本地数据库，和feature
  const upDataFature = (diyData, diyIndex) => {
    // 只有当diy关键字和目标关键字都有时才进行更新都有的时候
    const currentDiyData = diyKeyWordList[diyIndex]

    // 判断字段里是否都有值
    let isUpdata = true
    for(let key in diyField) {
      if(!currentDiyData[key]) isUpdata = false
    }
    if(isUpdata) {
      // 执行操作
      if(props.currentEditPlugins._id && props.currentEditPlugins._rev) {
        // 更新
        console.log('更新')
        const upDataParams = {
          ...props.currentEditPlugins,
          diyList: diyKeyWordList,
        }
        upDataStorge(upDataParams)
        // 每次更改把本插件的所有动态添加的feature删除，然后添加最新的
        // 根据当前插件id筛选本插件的feature
        const filterFeature = filterFetureById(getAllFeatures(), props.currentEditPlugins.name)
        // 删除
        filterFeature.forEach(feture => removeFeature(feture.code))
        // 添加
        diyKeyWordList.forEach(diyData => {
          const featureParams = generateFeatureParams(props.currentEditPlugins, diyData)
          setFeature(featureParams)
        })
      } else {
        // 添加  
        console.log('添加')

        // 把插件信息添加到本地存储
        const dbParams = {
          _id: generatePluinsId(props.currentEditPlugins),
          ...props.currentEditPlugins,
          diyList: diyKeyWordList
        }
        createStorage(dbParams) 
        // 添加feature
        const featureParams = generateFeatureParams(props.currentEditPlugins, diyData)
        setFeature(featureParams)
      }
    }
  }

  // 删除关键字
  const deleteKeyWord = (index) => {
    // 删除记录
    const deleteItem = diyKeyWordList.splice(index, 1)
    setDiyKeyWordList([...diyKeyWordList])
    // 更新本地数据库
    const upDataParams = {
      ...props.currentEditPlugins,
      diyList: diyKeyWordList,
    }
    upDataStorge(upDataParams)
    // 删除feture
    const deleteCode = generateFeatureCode(props.currentEditPlugins, deleteItem[0])
    removeFeature(deleteCode)

    // 如果diy列表为空了，则从本地数据库删除改插件记录
    if(diyKeyWordList.length === 0) {
      const id = generatePluinsId(props.currentEditPlugins)
      removeStorgeById(id)
    }
  }
  
  return (
    <Card className="card_content" title={ renderTitle(props.currentEditPlugins) }>
      <div className="list_title_warp">
        <div className="diy_keyWord_title">
          DIY关键字
        </div>
        <div className="line"></div>
        <div className="target_keyWord_title">
          目标插件关键字
        </div>
      </div>
      <div className="setting_list">
        { diyKeyWordList.map((diyData, diyIndex) => {
          return (
            <SingleSetting diyData={ diyData } diyDataIndex={ diyIndex } key={ diyIndex } diyDataChange={ diyDataChange } targetKeyWordList={ targetKeyWordList } upDataFature={ upDataFature } deleteKeyWord={ deleteKeyWord }/>
          )
        }) }
        <div className="memory_btn_Warp" style={{ position: 'fixed', right: 15, bottom: 15, zIndex: 2 }}>
          <Button type="primary" shape="circle" icon={<PlusOutlined />} size="large" onClick={ addDiyList }/>
        </div>
      </div>
    </Card>
  );
}

export default ConfigureContent;
