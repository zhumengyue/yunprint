/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/24
 * Time : 20:02
 * Desc :
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Icon, Modal, Form, Input, Button, Switch, Upload, InputNumber} from 'antd'

const FormItem = Form.Item;
const { SubMenu } = Menu;
const { Sider } = Layout;

let uuid = 0;

class Slider extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      ...props.openkey,
      ...props.selectkey,
      visible:false,
    }
  }
  rootSubmenuKeys = ['1', '2', '3'];

  handleOk = (e) => { // 对话框ok按钮
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => { // 对话框cancel按钮
    this.setState({
      visible: false,
    });
  }

  onOpenChange = (openKeys) => {
    // todo 使菜单仅展开一栏
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  createOrder = (e) => {
    if(e.key == '3') {
      console.log("you creating order")
      this.setState({visible:true})
    }
  }
  render() {
    const { onItemClick } = this.props;

    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => { // 每个添加条目
      return (
        <FormItem
          label={'文件 '+ (k+1) }
          required={false}
          key={k}
        >
          {getFieldDecorator('input-number', { initialValue: 3 })(
            <span className="ant-form-text">
              <Upload
                name="image[]"
                action="http://localhost/YunPrint/public/user/upload/upload"
                withCredentials={true}
                listType="text"
              >
                <Button>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>
              打印数量&nbsp;&nbsp;&nbsp;<InputNumber min={1} max={10} style={{width: 80}} defaultValue={1}/>&nbsp;&nbsp;&nbsp;&nbsp;
              打印类型&nbsp;&nbsp;&nbsp;<Switch checkedChildren="彩色" unCheckedChildren="黑白" onChange={()=>{console.log(k+1)}}/>&nbsp;&nbsp;<Switch checkedChildren="双页" unCheckedChildren="单页" />
            </span>
          )}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
        </FormItem>
      );
    })
    return (
      <Sider width={200} style={{background: 'black'}}>
        <Menu
          mode="inline"
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          style={{height: '100%', borderRight: 0}}
          selectedKeys={this.state.selectedKeys}
          onClick={onItemClick}
          onSelect = {this.createOrder}
        >
          <SubMenu key="1" title={<span><Icon type="cloud-o"/>我的主页</span>}>
            <Menu.Item key="11">我的资料</Menu.Item>
            <Menu.Item key="12">云资料库</Menu.Item>
          </SubMenu>
          <SubMenu key="2" title={<span><Icon type="file-text"/>我的订单</span>}>
            <Menu.Item key="21">全部订单</Menu.Item>
            <Menu.Item key="22">已完成订单</Menu.Item>
            <Menu.Item key="23">未完成订单</Menu.Item>
          </SubMenu>
          <Menu.Item key="3" onClick={()=>{}}><Icon type="file-add"/><span>创建订单</span></Menu.Item>
        </Menu>
        <Modal
          title="创建订单"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {/*<form action="http://localhost/YunPrint/public/user/upload/upload" encType="multipart/form-data" method="post">*/}
            {/*<input type="file" name="image[]" /><input type="submit" value="上传" />*/}
          {/*</form>*/}

          <Form onSubmit={this.handleSubmit}>
            {formItems}
            <FormItem>
              <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                <Icon type="plus" /> 添加文件
              </Button>

            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">Submit</Button>
            </FormItem>
          </Form>
        </Modal>
      </Sider>
    )
  }
}
Slider.propTypes = {
  onItemClick:PropTypes.func.isRequired
};

export default Form.create()(Slider);
