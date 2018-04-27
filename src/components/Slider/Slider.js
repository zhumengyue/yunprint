/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/24
 * Time : 20:02
 * Desc :
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Icon, Modal, Form, Button, Switch, Upload, InputNumber, message} from 'antd'
import fetch from '../../utils/fetch'
const FormItem = Form.Item;
const { SubMenu } = Menu;
const { Sider } = Layout;
let uuid = 0;
class Slider extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      fileList: [],
      uploading: false,
      orderitemnum: 0,
      ...props.openkey,
      ...props.selectkey,
      visible:false,
      filevisible: false,
    }
  }
  rootSubmenuKeys = ['1', '2', '3', '4'];

  handleOk = (e) => { // 对话框确认按钮
    this.setState({
      visible: false,
      filevisible: false,
    });
  }
  handleCancel = (e) => { // 对话框取消按钮
    this.setState({
      visible: false,
      filevisible: false,
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
    // todo 订单列表 移除条目
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    // todo 订单列表 新增条目
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++

    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleSubmit = (e) => {
    // todo 提交表单 获取表单内容
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  createOrder = (e) => {
    // todo 唤起 创建订单 / 上传文件 面板
    if(e.key === '3') {
      this.setState({visible:true})
    } else if(e.key === '4') {
        this.setState({filevisible:true})
    }
  }

  handleUpload = () => {
    // todo 上传文件
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('image[]', file);
    });

    this.setState({ // 设置loading状态
      uploading: true,
    });

    fetch({
      method: 'post',
      data: formData,
      url: 'http://localhost/YunPrint/public/user/upload/upload',
    }).then((data) => {
      console.log(data)
      if(data.data.errcode === 0) {
        message.success('上传成功',1);
        this.setState({
          fileList: [],
          uploading: false,
        });
        setTimeout(()=>{
          this.setState({
            visible: false,
            filevisible: false,
          })
        },1100)
      } else {
        message.error('上传失败');
      }
    });
  }
  render() {
    const { onItemClick } = this.props;
    const props = { // 文件上传相关props
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    };
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
          <Menu.Item key="4" onClick={()=>{}}><Icon type="cloud-upload-o" /><span>上传文件</span></Menu.Item>
        </Menu>
        <Modal
          title="上传文件"
          visible={this.state.filevisible}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>取消</Button>,
            <Button loading={this.state.uploading} disabled={this.state.fileList.length === 0} key="submit" type="primary"  onClick={this.handleUpload}>
              {this.state.uploading ? '上传中' : '开始上传'}
            </Button>,
          ]}
        >
          <Upload {...props}>
            <Button >
              <Icon type="upload" /> 选择文件
            </Button>
          </Upload>
          <br />
        </Modal>
        <Modal
          title="创建订单"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form onSubmit={this.handleSubmit}>
            {formItems}
            <FormItem>
              <Button type="dashed" onClick={this.add} style={{ width: '60%' }} disabled={keys.length === 3} >
                <Icon type="plus" /> {keys.length === 3 ?  '每个订单最多三个文件' : '添加文件'}
              </Button>
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" onClick={this.handleOk} disabled={keys.length === 0}>
                提交订单
              </Button>
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
