import React, { useRef, useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Card, message, Switch, Row, Col } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import UpLoadShowIcon from './UpLoadShowIcon'
import Cordelle from './Cordelle'
function TheModal(props) {
  const [form] = Form.useForm();
  const formRef = useRef()

  // 监听弹窗打开 和关闭
  useEffect(() => {
    if(props.modalVisible) { // 打开
      if(props.modalType === 2 && props.editValue.KeyWord) {
        // 编辑
        echoFormValue(props.editValue)
      } else if(props.modalType === 3) {
        echoFormValue(props.fileShape)
      }
    } else { // 关闭
      onReset()
    }

  }, [props.modalVisible])
  // 点击确认
  const onOk = () => {
    formRef.current.validateFields()
    .then(res => {
      switch (props.modalType) {
        case 1:
        case 3:
          props.addList(res)
          .then(() => {
            message.success('录入成功');
            props.setModalVisibleProp(false)
            onReset()
          })
          .catch(error => {
            message.error(error);
          })
        break
        case 2:
          props.editSingleValue(res, props.editValue.KeyWord)
          .then(() => {
            message.success('编辑成功');
            props.setModalVisibleProp(false)
            onReset()
          })
          .catch(error => {
            message.error('编辑失败');
          })
        break
        default:
      }
    })
    .catch(errorInfo => {
      // console.log(errorInfo)
    })
  }
  // 重置
  const onReset = () => {
    form && form.setFieldsValue({ KeyWord: '', fileList: [{fileName: '', filePath: ''}] })
  }

  // 回显表单值
  const echoFormValue = (value) => {
    formRef.current && formRef.current.setFieldsValue(value)
  }

  // 拖拽组件获取到文件
  const cordelleChnage = (file, index) => {
    const filePath = file.path
    const fileName = file.name
    const formValue = form.getFieldsValue()
    formValue.fileList[index].filePath = filePath
    // 没值自动填入,有值则不填入
    if(!formValue.fileList[index].fileName) {
      formValue.fileList[index].fileName = fileName
    }
    form.setFieldsValue(formValue)
  }
  return (
    <Modal
      visible={ props.modalVisible }
      title={ props.modalType === 1 ? '新增' : '编辑'}
      forceRender={true}
      width={600} 
      style={{ top: 20 }}
      onCancel={() => props.setModalVisibleProp(false)}
      onOk={onOk}
      okText= '确认'
      cancelText='取消'
    >
      <Form
        name="fileForm"
        form={form}
        wrapperCol={{ span: 12 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        labelCol={ {span: 6, offset: 0} }
        ref={ formRef }
      >
      <Form.Item 
        label="关键字"
        name="KeyWord"
        rules={[{ required: true, message: '请输入关键字' }]}
      >
        <Input placeholder="请输入关键字，用于打开资源"/>
      </Form.Item>
      {/* <Form.Item
        label="图标"
        valuePropName="showIcon"
        name="showIcon"
      >
        <UpLoadShowIcon />
      </Form.Item> */}
      <Form.Item
        label="是否同步打开资源"
        valuePropName="checked"
        name="isSync"
      >
        <Switch />
      </Form.Item>
      <Form.List name="fileList">
      {(fields, { add, remove }) => {
        return (
          <>
            {fields.map((field, index) => (
              <Card key={field.key} style={{ position: 'relative', marginBottom: 10 }}>
                { fields.length > 1  && <div style={{ position: 'absolute', right: 10, top: 10 }}>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </div>}

                <Form.Item
                   label="资源名称"
                   name={[field.name, 'fileName']}
                   rules={[{ required: true, message: '请输入文件名称' }]}
                 >
                   <Input placeholder="未输入时, 上传资源将自动填入名称"/>
                 </Form.Item>
                
                <Form.Item
                   label="资源路径"
                   name={[field.name, 'filePath']}
                   rules={[{ required: true, message: '请输入文件绝对路径' }]}
                 >
                   <Input placeholder="请输入资源绝对路径"/>
                 </Form.Item>
                 <Cordelle cordelleChnage={ (file) => { cordelleChnage(file, index) } }/>
              </Card>
            ))}

            <Form.Item wrapperCol={{ span: 24, offset: 8 }} style={{ marginTop: 10 }}>
              <Button type="dashed" onClick={() => add()}>
                添加打开资源
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
             <Button  danger onClick={ onReset }>重置</Button>
            </Form.Item>
          </>
        )
      }}
      </Form.List>
      </Form>
    </Modal>
  );
}

export default TheModal;
