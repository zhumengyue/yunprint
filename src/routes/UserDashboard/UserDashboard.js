/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/24
 * Time : 14:15
 * Desc :
 */
import React from 'react'
import { connect } from 'dva'
import { Layout, Menu, Breadcrumb, Icon, Tabs } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const TabPane = Tabs.TabPane;

class UserDashboard extends React.Component{
  state = {
    current: '11',
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render(){
    return(
      <div className='userindex'>
        <Layout style={{"height":"100%"}}>
          <Header>
          </Header>
          <Layout>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultOpenKeys={['1']}
                selectedKeys={[this.state.current]}
                style={{ height: '100%', borderRight: 0 }}
                onClick={this.handleClick}
              >
                <SubMenu key="1" title={<span><Icon type="cloud-o" />云资料库</span>}>
                  <Menu.Item key="11">常用资料</Menu.Item>
                  <Menu.Item key="12">全部资料</Menu.Item>
                </SubMenu>
                <SubMenu key="2" title={<span><Icon type="home" />我的主页</span>}>
                  <Menu.Item key="21">我的资料</Menu.Item>
                  <Menu.Item key="22">我的收藏</Menu.Item>
                </SubMenu>
                <SubMenu key="3" title={<span><Icon type="file-text" />我的订单</span>}>
                  <Menu.Item key="31">全部订单</Menu.Item>
                  <Menu.Item key="32">已完成订单</Menu.Item>
                  <Menu.Item key="33">未完成订单</Menu.Item>
                </SubMenu>
                <Menu.Item key="4" ><Icon type="file-add" /><span>创建订单</span></Menu.Item>
              </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 680 }}>
                <Tabs type="card"
                      activeKey={this.state.current}
                >
                  <TabPane tab="Tab Title 1" key="11">
                    <p>Content of Tab Pane 1</p>
                    <p>Content of Tab Pane 1</p>
                    <p>Content of Tab Pane 1</p>
                  </TabPane>
                  <TabPane tab="Tab Title 2" key="12">
                    <p>Content of Tab Pane 2</p>
                    <p>Content of Tab Pane 2</p>
                    <p>Content of Tab Pane 2</p>
                  </TabPane>
                  <TabPane tab="Tab Title 3" key="21">
                    <p>Content of Tab Pane 3</p>
                    <p>Content of Tab Pane 3</p>
                    <p>Content of Tab Pane 3</p>
                  </TabPane>
                  <TabPane tab="Tab Title 4" key="22">
                    <p>Content of Tab Pane 4</p>
                    <p>Content of Tab Pane 4</p>
                    <p>Content of Tab Pane 4</p>
                  </TabPane>
                  <TabPane tab="Tab Title 5" key="31">
                    <p>Content of Tab Pane 5</p>
                    <p>Content of Tab Pane 5</p>
                    <p>Content of Tab Pane 5</p>
                  </TabPane>
                  <TabPane tab="Tab Title 6" key="32">
                    <p>Content of Tab Pane 6</p>
                    <p>Content of Tab Pane 6</p>
                    <p>Content of Tab Pane 6</p>
                  </TabPane>
                  <TabPane tab="Tab Title 7" key="33">
                    <p>Content of Tab Pane 7</p>
                    <p>Content of Tab Pane 7</p>
                    <p>Content of Tab Pane 7</p>
                  </TabPane>
                  <TabPane tab="Tab Title 8" key="4">
                    <p>Content of Tab Pane 8</p>
                    <p>Content of Tab Pane 8</p>
                    <p>Content of Tab Pane 8</p>
                  </TabPane>
                </Tabs>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }

}
UserDashboard.propTypes = {
}
export default connect(({ userdashboard }) => ({ userdashboard }))(UserDashboard)
