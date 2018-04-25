/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/24
 * Time : 20:02
 * Desc :
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Icon } from 'antd'

const { SubMenu } = Menu;
const { Sider } = Layout;

class Slider extends React.Component {
// const Slider = ({ onItemClick }) => {
  constructor(props){
    super(props)
    this.state = {
      ...props.openkey,
      ...props.selectkey,
      // selectedKeys: props.selectkey.
    }
  }
  rootSubmenuKeys = ['1', '2', '3'];

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

    const { onItemClick ,openkey } = this.props;
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
          <SubMenu key="1" title={<span><Icon type="cloud-o"/>我的主页</span>}>
            <Menu.Item key="11">我的资料</Menu.Item>
            <Menu.Item key="12">云资料库</Menu.Item>
          </SubMenu>
          <SubMenu key="2" title={<span><Icon type="file-text"/>我的订单</span>}>
            <Menu.Item key="21">全部订单</Menu.Item>
            <Menu.Item key="22">已完成订单</Menu.Item>
            <Menu.Item key="23">未完成订单</Menu.Item>
          </SubMenu>
          <Menu.Item key="3"><Icon type="file-add"/><span>创建订单</span></Menu.Item>
        </Menu>
      </Sider>
    )
  }
}
Slider.propTypes = {
  onItemClick:PropTypes.func.isRequired
};
export default Slider;
