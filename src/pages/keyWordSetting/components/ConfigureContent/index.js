import { useEffect } from 'react';
import { Card, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import './index.scss'
import SingleSetting from './SingleSetting'
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
  useEffect(() => {
    console.log(props.currentEditPlugins, 'props.currentEditPlugins')
  }, [props.currentEditPlugins])
  return (
    <Card className="card_content" title={renderTitle(props.currentEditPlugins) }>
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
        <SingleSetting />
        <div className="memory_btn_Warp" style={{ position: 'fixed', right: 15, bottom: 15, zIndex: 2 }}>
          <Button type="primary" shape="circle" icon={<PlusOutlined />} size="large" />
        </div>
      </div>
    </Card>
  );
}

export default ConfigureContent;
