/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/24
 * Time : 20:02
 * Desc :
 */
import React from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Layout, Menu, Icon, Modal, Form, Button, Switch, Upload, InputNumber, message, Cascader,Select,Input} from 'antd'
import styles from './Slider.css'
import fetch from '../../utils/fetch'
const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
const { SubMenu } = Menu;
const { Sider } = Layout;
let uuid = 0;

class Slider extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      myfiletree:[],
      allfiletree:[],
      storetree:[],
      fileList: [], // 当前上传文件列表
      uploading: false,
      ...props.openkey,
      ...props.selectkey,
      visible:false, // 创建订单 modal 状态
      // visible:true, // 创建订单 modal 状态
      filevisible: false,// 上传文件 modal 状态
      feedback: false,
    }
  }
  rootSubmenuKeys = ['1', '2', '3', '4'];
  options = [];
  orderdata={
    sid: '',
    file1id: '',
    file1num: '',
    file1color: '',
    file1style: '',
    file2id: '',
    file2num: '',
    file2color: '',
    file2style: '',
    file3id: '',
    file3num: '',
    file3color: '',
    file3style: '',
    remark: '',
  }
  handleOk = (e) => { // 对话框确认按钮
    this.setState({
      visible: false,
      filevisible: false,
    });
  }
  handleOkFeed = () => { // 对话框确认按钮
    message.success('感谢您的反馈~我们会努力做得更好~',1)
    setTimeout(() => {this.setState({
      feedback: false,
    })},500);
  }
  handleCancel = (e) => { // 对话框取消按钮
    this.setState({
      visible: false,
      filevisible: false,
      feedback: false,
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
      // console.log(values)
      if (!err) {
        let key1 = values.keys[0],
            key2 = values.keys[1],
            key3 = values.keys[2];

        this.orderdata = {
          sid: values.sid,

          file1id: key1 !== undefined ? values.file[key1][1] : 0,
          file1num: key1!== undefined ? values.count[key1] : '',
          file1color: values.color[key1] ? 1 : 0,
          file1style: values.style[key1] ? 1 : 0,

          file2id: key2 !== undefined ? values.file[key2][1] : 0,
          file2num: key2!== undefined ? values.count[key2] : '',
          file2color: values.color[key2] ? 1 : 0,
          file2style: values.style[key2] ? 1 : 0,

          file3id: key3 !== undefined ? values.file[key3][1] : 0,
          file3num: key3!== undefined ? values.count[key3] : '',
          file3color: values.color[key3] ? 1 : 0,
          file3style: values.style[key3] ? 1 : 0,
          remark: values.remark
        }
        // console.log(this.orderdata)
        fetch({
          method: 'post',
          data: this.orderdata,
          url: 'http://yunprint.applinzi.com/YunPrint/public/index.php/user/order/createorder',
        }).then((data) => {
          console.log(data)
          if(data.data.errcode == "0") {
            message.success('订单创建成功！',1);
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
            window.location.reload();
          } else {
            message.error('订单创建失败');
            window.location.reload();
          }
        });
      }
    });
  }

  createOrder = (e) => {
    // todo 唤起 创建订单 / 上传文件 面板
    if(e.key === '3') {
      fetch({ // 商户信息
        method: 'get',
        url: 'http://yunprint.applinzi.com/YunPrint/public/index.php/user/order/showstore',
      }).then((data) => {
        this.setState({storetree: [...data.data.data]}) // 赋值给商户信息数组
      }).then(()=>{
        fetch({ // 我的资料
          method: 'get',
          url: 'http://yunprint.applinzi.com/YunPrint/public/index.php/user/file/getmyfile',
        }).then((data) => {
          this.setState({myfiletree: [...data.data.data]}) // 赋值给商户信息数组
        }).then(()=>{
          fetch({ // 云资料
            method: 'get',
            url: 'http://yunprint.applinzi.com/YunPrint/public/index.php/user/file/getpublicfile',
          }).then((data) => {
            this.setState({allfiletree: [...data.data.data]}) // 赋值给商户信息数组
            this.setState({visible:true}) // 全部数据加载完成，唤醒弹窗
            this.options = [{
              value: 'my',
              label: '我的资料库',
              children: [{}],
              key: 1,
            },{
              value: 'all',
              label: '云资料库',
              children: [{}],
              key: 2,
            }]
            for (let i=0;i<this.state.allfiletree.length;i++){
              this.options[1].children = this.options[1].children.concat([{}])
              this.options[1].children[i].value = this.state.allfiletree[i].id;
              this.options[1].children[i].label = this.state.allfiletree[i].filename;
            }
            for (let i=0;i<this.state.myfiletree.length;i++){
              this.options[0].children = this.options[0].children.concat([{}])
              this.options[0].children[i].value = this.state.myfiletree[i].id;
              this.options[0].children[i].label = this.state.myfiletree[i].filename;
            }
          });
        });
      });

    } else if(e.key === '4') {
        this.setState({filevisible:true})
    } else if ( e.key === '5'){
      this.setState({feedback:true})
    }
  }

  onChange(value) {
    // console.log(value);
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
      url: 'http://yunprint.applinzi.com/YunPrint/public/index.php/user/upload/upload',
    }).then((data) => {
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
    const { onItemClick, userdashboard, dispatch } = this.props;
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
        <div>
          <FormItem
            label={'文件 '+ (k+1) }
            required={false}
            key={'1'+k}
          >
            {getFieldDecorator(`file[${k}]`,{
              rules: [{ required: true  , message: '请选择文件!' }],
            })(
              <Cascader
                options={this.options}
                expandTrigger="hover"
                onChange={this.onChange}
                placeholder='请选择文件'
              />
            )}
          </FormItem>
          <FormItem
            key={'2'+k}
          >
            <span className="ant-form-text">
              打印数量&nbsp;&nbsp;&nbsp;
            {getFieldDecorator(`count[${k}]`,{
              initialValue: 1
            })(
              <InputNumber min={1} style={{width: 60}}/>
              )}
            </span>

            <span className="ant-form-text">
              黑白/彩色&nbsp;&nbsp;
              {getFieldDecorator(`color[${k}]`,{
                valuePropName: 'checked',
                initialValue: false
              })(
                <Switch checkedChildren="彩色" unCheckedChildren="黑白" />
                )}
            </span>

            <span>
              &nbsp;&nbsp;单页/双页&nbsp;&nbsp;
              {getFieldDecorator(`style[${k}]`,{
                valuePropName: 'checked',
                initialValue: false
              })(
                <Switch checkedChildren="双页" unCheckedChildren="单页" />
                )}
              &nbsp;&nbsp;
            </span>
            {keys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                disabled={keys.length === 1}
                onClick={() => this.remove(k)}
                style={{ fontSize: 18, marginTop: 2,}}
              />
            ) : null}
          </FormItem>
        </div>
      );
    })
    return (
      <Sider width={200} className={styles.slider}>
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
          <Menu.Item key="5" onClick={()=>{}}><Icon type="message"/><span>意见反馈</span></Menu.Item>
        </Menu>
        <Modal
          title="意见反馈"
          visible={this.state.feedback}
          onCancel={this.handleCancel}
          footer={[ '',
            <Button key="submit" type="primary"  onClick={this.handleOkFeed}>
              确定
            </Button>,
          ]}
        >
          <TextArea
            rows={4}
            placeholder='请写下您的建议~'
            onPressEnter={this.handleOkFeed}/>
          <br />
        </Modal>
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
            <FormItem
              label="选择店铺"
            >
              {getFieldDecorator(`sid`,{
                rules: [{ required: true  , message: '请选择店铺!' }],
              })(
                <Select
                  showSearch
                  placeholder="选择一个打印店铺"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {this.state.storetree[0] ? <Option value={this.state.storetree[0].id}>{this.state.storetree[0].storename}</Option> : ''}
                  {this.state.storetree[1] ? <Option value={this.state.storetree[1].id}>{this.state.storetree[1].storename}</Option> : ''}
                  {this.state.storetree[2] ? <Option value={this.state.storetree[2].id}>{this.state.storetree[2].storename}</Option> : ''}
                  {this.state.storetree[3] ? <Option value={this.state.storetree[3].id}>{this.state.storetree[3].storename}</Option> : ''}
                  {this.state.storetree[4] ? <Option value={this.state.storetree[4].id}>{this.state.storetree[4].storename}</Option> : ''}
                </Select>
              )}
            </FormItem>
            {formItems}
            <FormItem>
              <Button type="dashed" onClick={this.add} style={{ width: '60%' }} disabled={keys.length === 3} >
                <Icon type="plus" /> {keys.length === 3 ?  '每个订单最多三个文件哦 ~' : '添加文件'}
              </Button>
            </FormItem>
            <FormItem>
              {getFieldDecorator(`remark`)(
                <TextArea placeholder="你可以在这里填写一些关于此订单的备注信息~"/>
              )}
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
function mapStateToProps({ userdashboard }) {
  return {userdashboard} ;
}
export default connect(mapStateToProps)(Form.create()(Slider));
