import { getPathUTools } from '@/utils/uTools'
export function  getPluginsPath() {
  const appDataPath = getPathUTools('appData')
  const uToolsPath = appDataPath + '\\uTools\\plugins'
  return uToolsPath
}