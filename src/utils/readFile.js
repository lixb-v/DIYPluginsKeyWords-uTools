const { fs, path } = window.getToolPlug()


/**
 * @description 获取uTools应用数据下plugins文件下以asar结尾的
 * @param 文件绝对路径
*/
export function getFileList(filePath) {
  const fileList = []
  return new Promise((resole, reject) => {
    const newFilePath = path.resolve(filePath)
    //根据文件路径读取文件，返回文件列表
     fs.readdir(newFilePath,function(err,files){
       if(err){
           console.warn(err)
       }else{
           //遍历读取到的文件列表
           files.forEach(function(filename){
               //获取当前文件的绝对路径
               var filedir = path.join(filePath, filename);
               //根据文件路径获取文件信息，返回一个fs.Stats对象
               fs.stat(filedir,function(eror, stats){
                   if(eror){
                       console.warn('获取文件stats失败');
                   }else{
                     const filedirArr= filedir.split('.')
                     if(filedirArr[1] === 'asar' && !filedirArr[2]) {
                       fileList.push(filedir)
                     }
                   }
               })
           });
       }
     });
     resole(fileList)
  })
}

// // 如果 filedir 里有plugin.json 打印
// if(filedir.indexOf('plugin.json') !== -1) {
//   console.log(filedir);
//   // 读取文件内容
//   var content = fs.readFileSync(filedir, 'utf-8');
//   console.log(content);
// }
// if(filedir.indexOf('logo') !== -1) {
//     console.log(filedir);
//     // 读取文件内容
//     var content = fs.readFileSync(filedir, 'binary');
//     console.log(content);
// }