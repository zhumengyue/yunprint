/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/24
 * Time : 8:34
 * Desc :
 */
import React from 'react'
import styles from './Logo.css'
const Logo = () => {
    return(
      <div className={styles.logo}>
        <img alt="" src={require('../../assets/logo.png')} className={styles["logo-icon"]} />
        <p className={styles["logo-text"]}>云打印</p>
      </div>
    )
}

export default Logo;
