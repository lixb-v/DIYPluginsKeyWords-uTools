import { Input, Select } from 'antd'
import './index.scss'
const { Option } = Select;
function onChange(value) {
  console.log(`selected ${value}`);
}

function onSearch(val) {
  console.log('search:', val);
}
function SingleSetting() {
    return (
      <div className="singleSetting_warp">
        <div className="diy_keyWord">
          <Input placeholder="请输入DIY关键字" />
        </div>
        <div className="line_warp">
          <span className="line"></span>
        </div>
        <div className="target_keyWord">
        <Select
          style={{ width: '100%' }}
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
        </Select>,
        </div>
      </div>
    )
  }
export default SingleSetting