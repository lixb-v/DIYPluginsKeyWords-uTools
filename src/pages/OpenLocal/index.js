import './index.scss'
import { useState, useEffect } from 'react'
import { Table, Button, Card, Tag, Popconfirm, message, Tooltip, Switch } from 'antd'
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import TheModal from './components/TheModal/index'
import { convertDate, generateId } from '@/utils/index'
import { openLoaclKey } from '@/const'
import { getAllFileList, saveFileInfo, addFeature, deleteFileInfo, deleteFeature, updataFileInfo } from '@/uTools/openLoacl'
const cellListRender = (list, key, tipKey) => {
  return (
    <>
      { list.map((fileItem, fileIndex) => (
        <div key={fileIndex}>
          <Tooltip title={ fileItem[tipKey] }>
           <Tag color="blue">{ fileItem[key].slice(0, 10) }</Tag>
           <div style={{ height: 4 }}></div>
          </Tooltip>
        </div>
      )) }
      
    </>
  )
}
const Home = () => {
  const [ modalVisible, setModalVisible ] = useState(false)
  const [ modalType, setModalType ] = useState(1)
  const [ editValue, setEditValue ] = useState({})
  const [fileList, setFileList] = useState([])
  const columns = [
    {
      title: '是否启用',
      dataIndex: 'isEnabled',
      key: 'isEnabled',
      align: 'center',
      render: (text, record, index) => {
        return (
          <Switch checked={ record.isEnabled } onChange={ () => { enabledChange(text, record, index) } }/>
        )
      }
    },
    {
      title: '关键字',
      dataIndex: 'KeyWord',
      key: 'KeyWord',
      align: 'center',
      width: 100
    },
    {
      title: () => {
        return (
          <div>
            <div>资源名称</div>
            <div className="tableHintText">(鼠标移入名称内查看资源路径)</div>
          </div>
        )
      },
      dataIndex: 'fileName',
      key: 'fileName',
      align: 'center',
      render: (text, record, index) => {
        return cellListRender(record.fileList, 'fileName', 'filePath')
      }
    },
    {
      title: () => {
        return (
          <div>
            <div>是否同步</div>
            <div className="tableHintText">同步: 依次打开资源</div>
            <div className="tableHintText">异步: 同时打开所有资源</div>
          </div>
        )
      },
      dataIndex: 'isSync',
      key: 'isSync',
      align: 'center',
      render: (text, record, index) => {
        return (
          <Switch checked={ record.isSync } onChange={ () => { syncChnage(text, record, index) } }/>
        )
      }
    },
     {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      align: 'center'
    }, {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (text, record, index) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Tooltip title="编辑">
            <Button type="primary" shape="circle" icon={<EditFilled />} size='small' onClick={ () => { editor(text, record, index) } }/>
          </Tooltip>
          <div style={{ width: '10px' }}></div>
          <Popconfirm
            title="您真的要删除该记录吗?"
            onConfirm={() => { deteleFile(text, record, index) }}
            okText="Yes"
            cancelText="No"
          >
          <Tooltip title="删除">
            <Button danger shape="circle" size='small' icon={<DeleteFilled />} />
          </Tooltip>
         </Popconfirm>,
        </div>
      ),
    }
  ]
  useEffect(() => {
    initFileList()
  }, []);

  const initFileList = () => {
    const list = getAllFileList(openLoaclKey)
    console.log(list, 'list')
    setFileList(list)
  }
  // 编辑
  const editor = (value) => {
    setEditValue(value)
    setModalType(2)
    setModalVisible(true)
  }
  // 添加
  const add = () => {
    setModalType(1)
    setModalVisible(true)
  }
  // 添加到列表中
  const addList = (formValue) => {
    return new Promise((resole, reject) => {
      const newVlaue = {...formValue}
      // 校验列表是否已经存在关键字
      if(fileList.find(fileItem => fileItem.KeyWord === newVlaue.KeyWord)) {
        reject('关键字已存在，请重新输入')
        return
      }
      newVlaue.createTime = convertDate()
      newVlaue._id = generateId(openLoaclKey, newVlaue.KeyWord)
      newVlaue.isEnabled = true
      saveFileInfo(newVlaue)
      addFeature(newVlaue)
      initFileList()
      resole(true)
    })
  }
  // 编辑
  const editSingleValue = (value, key) => {
    return new Promise((resole, reject) => {
      const findItem = fileList.find(item => item.KeyWord === key)
      if(findItem) {
        for(let valueKey in value) {
          findItem[valueKey] = value[valueKey]
        }
        updataFileInfo(findItem)
        initFileList()
        resole(true)
      } else {
        reject('编辑失败')
      }
    })
  }
    // 删除
  const deteleFile = (fileInfo) => {
    const findItem = fileList.find(item => item._id === fileInfo._id)
    if(findItem) {
      deleteFileInfo(fileInfo._id)
      deleteFeature(fileInfo._id)
      initFileList()
      message.success('删除成功')
    }
  }
  // 设置弹窗状态
  const setModalVisibleProp = (value) => {
    setModalVisible(value)
  }

  // 是否同步状态发生改变
  const syncChnage = (text, record, index) => {
    const findItem = fileList.find(item => item.KeyWord === record.KeyWord)
    if(findItem) {
      findItem.isSync = !record.isSync
      updataFileInfo(findItem)
      initFileList()
    }
  }

  // 是否启用状态发生改变
  const enabledChange = (text, record, index) => {
    const findItem = fileList.find(item => item.KeyWord === record.KeyWord)
    if(findItem) {
      findItem.isEnabled = !record.isEnabled
      // 开启和关闭快捷键
      findItem.isEnabled ? addFeature(findItem) : deleteFeature(findItem._id)
      updataFileInfo(findItem)
      initFileList()
    }
  }
  return (
    <div className="page">
      <Card style={{ width: 780, minHeight: 450, overflowY: 'scroll', margin: 'auto', marginTop: '10px' }} title="资源列表">
        <div className="add_bon_warp">
          <Button type="primary" onClick={ add }>添加</Button>
        </div> 
        <div className="table_warp">
          <Table columns={columns} dataSource={fileList} scroll={{ x: 100 }} rowKey="KeyWord" pagination={ false } bordered/>
        </div>
      </Card>
      <TheModal
        editValue = { editValue }
        modalVisible={modalVisible}
        modalType={ modalType }
        addList={ addList }
        setModalVisibleProp= { setModalVisibleProp }
        editSingleValue = {editSingleValue}
      />
    </div>
  );
}

export default Home;
