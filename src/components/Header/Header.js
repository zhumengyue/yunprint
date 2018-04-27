/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/25
 * Time : 11:30
 * Desc :
 */
import React from 'react'
import { connect } from 'dva'
import { Layout, Menu, Dropdown, Icon, Popconfirm } from 'antd'
import styles from './Header.css'

const { Header } = Layout;

const HeaderTitle = ({name,login,dispatch}) => {

  const menu = (

      <Menu >
        <Menu.Item key="1" >
          <Popconfirm title="确定注销并退出吗？" onConfirm={delLogin}  okText="是" cancelText="否">
            退出登录
          </Popconfirm>
        </Menu.Item>
      </Menu>

  );

  function delLogin() {
    dispatch({ type: 'login/dellogin'})
  }
  return(
    <Header className={styles.header}>
      <div className={styles.logo}>
        <img alt="" src={require('../../assets/logo.png')} className={styles["logo-icon"]} />
        <p className={styles["logo-text"]}>云打印</p>
      </div>
      <div className={styles.usermenu}>
        <Dropdown overlay={menu}>
          <a className={styles["menu-item"]}><Icon type="user" className={styles.icon} />{name.username}  <Icon type="down" style={{fontSize: 18}} className={styles.icondown}/></a>
        </Dropdown>
      </div>
    </Header>
  )
}
export default connect(({ login }) => ({ login }))((HeaderTitle))

