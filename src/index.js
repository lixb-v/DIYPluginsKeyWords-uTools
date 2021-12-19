import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { getPluginsPath } from '@/utils/index'
import { getFileList } from '@/utils/readFile'

utools.onPluginEnter(({code, type, payload, optional}) => {
	// 判断code
	if(code === 'configure'){ // 显示设置页面
		console.log('进入设置页面:',code,type,payload, optional);
    const uToolsPath = getPluginsPath()
    console.time('fileList')
    getFileList(uToolsPath).then((fileList) => {
      console.timeEnd('fileList')
      console.log(fileList, 'fileList')
    } )
	}else{// 进入脚本执行
		console.log('进入脚本执行:',code,type,payload, optional);
	}
})
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
