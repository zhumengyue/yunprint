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
            {getFieldDecorator('shoper', {
              valuePropName: 'checked',
              initialValue: false,
            })(
              <Checkbox style={{float:'left'}}>作为商家登录</Checkbox>
            )}
            <a className={styles["login-form-forgot"]} href="">忘记密码</a>
          </FormItem>
          <FormItem>
            <Button type="primary" onClick={handleSubLogin} className={styles["login-form-button"]}>
              登&nbsp;&nbsp;&nbsp;录
            </Button>
          </FormItem>
          <FormItem>
            <a><p onClick={handleSubReg} className={styles["register-btn"]}>注 册 >></p></a>
          </FormItem>
        </Form>
      </div>
    </div>
  );
}
Login.propTypes = {
};

export default connect(({ login }) => ({ login }))(Form.create()(Login))
