/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/26
 * Time : 17:30
 * Desc :
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Icon, Form } from 'antd'
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
      filevisible: false,
    }
  }
  rootSubmenuKeys = ['1', '2', '3', '4'];

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
        >
          <Menu.Item key="1"><span><Icon type="cloud-o"/>商铺界面</span></Menu.Item>
          <SubMenu key="2" title={<span><Icon type="file-text"/>我的订单</span>}>
            <Menu.Item key="21">全部订单</Menu.Item>
            <Menu.Item key="22">未接收订单</Menu.Item>
            <Menu.Item key="23">未打印订单</Menu.Item>
          </SubMenu>
          <Menu.Item key="3" onClick={()=>{}}><Icon type="file-add"/><span>意见反馈</span></Menu.Item>
        </Menu>
      </Sider>
    )
  }
}
ShopSlider.propTypes = {
  onItemClick:PropTypes.func.isRequired
};

export default Form.create()(ShopSlider);
