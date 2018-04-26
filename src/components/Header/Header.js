/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/25
 * Time : 11:30
 * Desc :
 */
import React from 'react'
import { Layout, Menu, Dropdown, Icon } from 'antd'
import styles from './Header.css'

const { Header } = Layout;
const menu = (
  <Menu>
    <Menu.Item key="1">退出登录</Menu.Item>
  </Menu>
);
const HeaderTitle = (name) => {
  return(
    <Header className={styles.header}>
      <div className={styles.logo}>
        <img alt="" src={require('../../assets/logo.png')} className={styles["logo-icon"]} />
        <p className={styles["logo-text"]}>云打印</p>
      </div>
      <div className={styles.usermenu}>
        {/*<Icon type="bell" style={{color: '#5387F2'}} className={styles["menu-item"]}/>*/}
        <Dropdown overlay={menu}>
          <a className={styles["menu-item"]}><Icon type="user" className={styles.icon} />{name.name.username}  <Icon type="down" style={{fontSize: 18}} className={styles.icondown}/></a>
        </Dropdown>
      </div>
    </Header>
  )
}

export default HeaderTitle;
