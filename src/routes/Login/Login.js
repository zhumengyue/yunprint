/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/24
 * Time : 8:20
 * Desc :
 */
import React from 'react'
import { connect } from 'dva'
import { Button, Input, Icon, Form,Checkbox } from 'antd'
import Logo from '../../components/Logo/Logo'
import styles from './Login.css'

const FormItem = Form.Item;

const Login = ({
  login,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  function handleSubReg(e) {
  // todo 注册
    dispatch({ type: 'register/goregister'})
  }

  function handleSubLogin (e) {
    // todo 登录
    e.preventDefault();
    validateFieldsAndScroll((errors,values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'login/login', payload: values })
    })
  }
  return (
    <div className={styles.normal}>
      <div className={styles.logo}>
        <img alt="" src={require('../../assets/logo1.png')} className={styles["logo-icon"]} />
        <p className={styles["logo-text"]}>云打印</p>
      </div>
      <div className={styles.bg}>
        <Form className={[styles["login-form"]]}>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 16 }} />} placeholder="用户名" className={styles["ant-input-affix-wrapper"]}/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 16 }} />} type="password" placeholder="密码" className={styles["ant-input-affix-wrapper"]}/>
            )}
          </FormItem>
          <FormItem className={styles.check}>
            {getFieldDecorator('shopper', {
              valuePropName: 'checked',
              initialValue: false,
            })(
              <Checkbox style={{float:'left'}}>作为商家登录</Checkbox>
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" onClick={handleSubLogin} className={styles["login-form-button"]}>
              登&nbsp;&nbsp;&nbsp;录
            </Button>
            <p  className={styles["register-btn"]}>没有账号？去 <a onClick={handleSubReg}>注册</a></p>
          </FormItem>
        </Form>
      </div>
    </div>
  );
}
Login.propTypes = {
};

export default connect(({ login }) => ({ login }))(Form.create()(Login))
