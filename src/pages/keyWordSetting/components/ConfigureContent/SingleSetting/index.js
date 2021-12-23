import { useState, useRef, useEffect } from 'react'
import { Input, Select, Button, Popconfirm } from 'antd'
import { DeleteFilled } from '@ant-design/icons'
import './index.scss'
import { diyField } from '@/const'
const { Option } = Select;

function SingleSetting(props) {
  const [ isShowDelete, setIsShowDelete ] = useState(false)
  // dom
  const inputRef = useRef(null) // 输入框dom
  const selectRef = useRef(null) // 下拉框dom

  // 文本和输入框/下拉框切换
  const [ diyKeyWordSwitch, setDiyKeyWordSwitch ] = useState(false) // true为显示输入框，fasle为显示文本框
  const [ targetKeyWordSwitch, setTargetKeyWordSwitch ] = useState(false) // true为显示下拉框，fasle为显示文本框

  // 值
  const [ diyFeedInData, setDiyFeedInData] = useState({...diyField})

  useEffect(() => {
    setDiyFeedInData(props.diyData)
  }, [props.diyData])

  useEffect(() => {
    if(!props.diyData.diyKeyWord) return diyKeyWordDocuble()
    if(!props.diyData.targetKeyWord) targetKeyWordDocuble()
  }, [])
  // diy关键字

  // diy关键字双击事件
  const diyKeyWordDocuble = () => {
    setDiyKeyWordSwitch(true)
    setTimeout(() => {
      inputRef.current.focus({
        cursor: 'end',
      });
    }, 0);
  }

  // 输入框失去焦点事件 
  const inputOnBlur = () => {
    setDiyKeyWordSwitch(false)
    props.upDataFature(diyFeedInData, props.diyDataIndex)
  }

  // 输入框内容变化
  const inputValueChnage = (e) => {
    diyFeedInData.diyKeyWord = e.target.value
    setDiyFeedInData({...diyFeedInData})
    props.diyDataChange(diyFeedInData, props.diyDataIndex)
  }

  // 目标关键字 

  // 目标关键字双击事件
  const targetKeyWordDocuble = () => {
    setTargetKeyWordSwitch(true)
    setTimeout(() => {
      selectRef.current.focus({
        cursor: 'end',
      });
    }, 0);
  }
  // 选择框失去焦点事件
  const selectOnBlur = () => {
    setTargetKeyWordSwitch(false)
    props.upDataFature(diyFeedInData, props.diyDataIndex)
  }
  // 选择框内容发生变化
  function selectValueChange(value) {
    diyFeedInData.targetKeyWord = value
    setDiyFeedInData({...diyFeedInData})
    props.diyDataChange(diyFeedInData, props.diyDataIndex)
  }
  
  // 移入
  const onMouseOver = () => {
    setIsShowDelete(true)
  }

  // 移出
  const onMouseOut = () => {
    setIsShowDelete(false)
  }
  return (
    <div className="singleSetting_warp" onMouseOver={ onMouseOver } onMouseOut={onMouseOut}>
      <div className="diy_keyWord" onDoubleClick={ diyKeyWordDocuble }>
        <Input style={{ display: diyKeyWordSwitch ? 'inherit' : 'none' }} placeholder="请输入DIY关键字" ref={ inputRef } onBlur={ inputOnBlur } value={ props.diyData.diyKeyWord } onChange={ inputValueChnage }/>
        <div style={{ display: diyKeyWordSwitch ? 'none' : 'flex' }} className="diy_keyWord_show_text">{ props.diyData.diyKeyWord }</div> 
      </div>
      <div className="line_warp">
        <span className="line"></span>
      </div>
      <div className="target_keyWord" onDoubleClick={ targetKeyWordDocuble }>
        <Select
          ref={ selectRef }
          value={ props.diyData.targetKeyWord }
          style={{ width: '100%', display: targetKeyWordSwitch ? 'inherit' : 'none' }}
          // mode="multiple" // 多选
          showSearch
          placeholder="请选择目标关键字"
          optionFilterProp="children"
          onChange={selectValueChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onBlur={ selectOnBlur }
        >
          { props.targetKeyWordList.map((targetKeyWOrd, targetIndex) => <Option key={ targetIndex } value={targetKeyWOrd}>{ targetKeyWOrd }</Option>) }
        </Select>
        <div style={{ display: targetKeyWordSwitch ? 'none' : 'flex' }} className="target_keyWord_show_text">{ props.diyData.targetKeyWord  }</div>
      </div>
      {/* 删除按钮 */}
      <div className={ `delete_btn ${ isShowDelete && 'delete_btn_show' }` }>
        <Popconfirm
          title="您真的要删除该记录吗?"
          onConfirm={() => { props.deleteKeyWord(props.diyDataIndex) }}
          okText="Yes"
          cancelText="No"
        >
          <Button danger shape="circle" size='small' icon={<DeleteFilled />} />
        </ Popconfirm>
      </div>
    </div>
  )
  }
export default SingleSetting