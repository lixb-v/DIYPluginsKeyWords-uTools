
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

function Cordelle(props) {
  const draggerProps = {
    name: 'file',
    showUploadList: false,
    beforeUpload: (file) => {
      props.cordelleChnage(file)
      return false
    }
  };
    return (
     <Dragger {...draggerProps}>
       {/* <p className="ant-upload-drag-icon">
         <InboxOutlined /> 
       </p> */}
       <div className="ant-upload-text">把文件拖拽到此处或者点击上传获取绝对路径和名称。</div>
       <div>点击上传后,uTools会隐藏,需要再次打开。请优先使用拖拽上传</div>
      </Dragger>
    )
  }
export default Cordelle