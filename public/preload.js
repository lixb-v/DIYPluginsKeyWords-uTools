
const { shell } = require('electron')

window.openItem = function (fullPath){
	return shell.openPath(fullPath);
}


var fs = require('fs');
var path = require('path');//解析需要遍历的文件夹


window.getToolPlug = function () {
	return {
		fs,
		path
	}
}
