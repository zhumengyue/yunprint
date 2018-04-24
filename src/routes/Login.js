import React from 'react'
import { connect } from 'dva'
import { Button, Input, Icon, Form } from 'antd'
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

// export default connect()(WrappedNormalLoginForm);
export default connect(({ login }) => ({ login }))(Form.create()(Login))
