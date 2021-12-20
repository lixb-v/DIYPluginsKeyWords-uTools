import React from 'react';
import { Card } from 'antd'
import './index.scss'
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
  return (
    <Card title={renderTitle(props.currentEditPlugins) }>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  );
}

export default ConfigureContent;
