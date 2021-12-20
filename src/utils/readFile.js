const { fs, path } = window.getToolPlug()


/**
 * @description 获取一个文件下的文件的绝对路径
 * @param {String}文件路径
 * @return {Array} 文件下所有文件绝对路径的集合
 * 
*/
export function readFileInsidePath(filePath) {
  return new Promise((resole, reject) => {
    const resolveFilePath = path.resolve(filePath)

    fs.readdir(resolveFilePath,function(err, files){
      if(!err) {
         //遍历读取到的文件列表
         const filePathList = files.map((fileName) => {
           return path.join(filePath, fileName)
         })
         resole(filePathList)
      }
    });
  })
}


/**
 * @description 根据文件路径获取文件的Stats对象
 * @param {String} 文件绝对路径
 * @return {Object} 文件的 Stats 对象
 * 
*/
export function readFileStatsByPath(filePath) {
  return new Promise((resole, reject) => {
     //根据文件路径获取文件信息，返回一个fs.Stats对象
     fs.stat(filePath,function(eror, stats){
      if(!eror) {
       resole(stats)
      }
    })
  })
}


/**
 * @description 获取uTools应用数据下plugins文件下以asar结尾的插件的路径集合
 * @param 文件绝对路径
*/
export function getPluginsPathList(filePath) {
  return new Promise((resole, reject) => {
    // 读取文件下所有文件的路径
    readFileInsidePath(filePath).then(filePathList => {
      // 获取插件的路径
      const pluginsPathList = filePathList.filter(filterItem => {
        const filedirArr= filterItem.split('.')
        return filedirArr[1] === 'asar' && !filedirArr[2]
      })
      resole(pluginsPathList)
    })
  })
}


/**
 * @description 根据文件路径集合读取文件内容，并返回一个内容集合
 * @param {Array} 文件下所有文件绝对路径的集合
 * @return {Array} 文件的所有内容集合
*/

export function readFileContent(filePathList) {  
  return new Promise((resole, reject) => {
    const contentList = filePathList.map(async (filePath) => {
      // 读取当前插件下的所有文件
      const fileList = await readFileInsidePath(filePath)
      return disposePlugins(fileList, filePath)
    })
    Promise.all(contentList).then(res => {
      resole(res)
    })
  })
}

/**
 * @description 处理插件信息 扎到需要的文件进行读取
 * @param {String} 插件路径
 * @return {Object} 插件信息
*/
export function disposePlugins(PluginsInfo, filePath) {
  // 找出需要的文件进行读取

  // 找到plugin文件
  let pluginFileContent = {}
  const pluginFile = PluginsInfo.find(item => item.indexOf('plugin.json') !== -1)
  if(pluginFile) {
　 　　// 读取文件内容
     const contentStr = fs.readFileSync(pluginFile, 'utf-8');
     pluginFileContent = {...JSON.parse(contentStr)}  
    //  获取logo
     const logoPath =  filePath + '\\' +pluginFileContent.logo
     pluginFileContent.logoPath = logoPath
  }
  return pluginFileContent
}

/**
 * @description 获取Plugins下插件的信息集合
 * @param {String} Plugins所在的路径
 * @return {Array} 插件内容集合
 * 
*/
export function getPluginsDataList(uToolsPath) {
  return new Promise((resole, reject) => {
    console.time('获取所有插件路径')
    getPluginsPathList(uToolsPath).then((pluginsPathList) => {
      console.timeEnd('获取所有插件路径')
      console.time('获取所有插件信息')
      readFileContent(pluginsPathList).then(pluginsInfoList => {
        console.timeEnd('获取所有插件信息')
        resole(pluginsInfoList)
      })
    })
  })
}