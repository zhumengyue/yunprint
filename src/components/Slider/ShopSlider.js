/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/26
 * Time : 17:30
 * Desc :
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Icon, Form, Button, Modal, Input, message } from 'antd'
const { TextArea } = Input;
const { SubMenu } = Menu;
const { Sider } = Layout;

class ShopSlider extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      fileList: [],
      uploading: false,
      ...props.openkey,
      ...props.selectkey,
      visible:false,
    }
  }
  rootSubmenuKeys = ['1', '2', '3', '4'];

  handleOk = () => { // 对话框确认按钮
    message.success('感谢您的反馈~我们会努力做得更好~',1)
    setTimeout(() => {this.setState({
      visible: false,
    })},500);
  }
  handleCancel = () => { // 对话框取消按钮
    this.setState({
      visible: false,
    });
  }

  createOrder = (e) => {
    // todo 唤起 意见反馈 面板
    if(e.key === '3') {
      this.setState({visible:true})
    }
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

  render() {
    const { onItemClick } = this.props;
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
          <SubMenu key="2" title={<span><Icon type="file-text"/>我的订单</span>}>
            <Menu.Item key="21">全部订单</Menu.Item>
            <Menu.Item key="22">未接收订单</Menu.Item>
            <Menu.Item key="23">未打印订单</Menu.Item>
            <Menu.Item key="24">待领取订单</Menu.Item>
          </SubMenu>
          <Menu.Item key="3" onClick={()=>{}}><Icon type="message"/><span>意见反馈</span></Menu.Item>
        </Menu>
        <Modal
          title="意见反馈"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={[ '',
            <Button key="submit" type="primary"  onClick={this.handleOk}>
              确定
            </Button>,
          ]}
        >
          <TextArea
            rows={4}
            placeholder='请写下您的建议~'
            onPressEnter={this.handleOk}/>
          <br />
        </Modal>
      </Sider>
    )
  }
}
ShopSlider.propTypes = {
  onItemClick:PropTypes.func.isRequired
};

export default Form.create()(ShopSlider);
