
const { shell } = require('electron')
require('./utils/readFile')
window.openItem = function (fullPath){
	return shell.openPath(fullPath);
}

window.openHttpAddress = function (address) {
	return shell.openExternal(address)
}