/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/4/24
 * Time : 8:20
 * Desc :
 */
import React from 'react'
import { connect } from 'dva'
import { Form, Input, Button } from 'antd'
import Logo from '../../components/Logo/Logo'
import styles from './Register.css'

const FormItem = Form.Item;

const Register = ({
  register,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  function handleSubmitRegister () {
    // todo 确认注册
    validateFieldsAndScroll((errors,values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'register/register', payload: values })
    })
  }

  function handleBack() {
    // todo 返回
    dispatch({ type: 'register/returnback'})
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <div className={styles.register}>
      <Logo />
      <Form className={styles["register-form"]}>
        <FormItem className={styles.item}
          {...formItemLayout}
          label="用户名"
        >
          {getFieldDecorator('username', {
            rules: [{
              required: true, message: '请输入用户名!',
            }],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem className={styles.item}
                  {...formItemLayout}
                  label="真实姓名"
        >
          {getFieldDecorator('realname', {
            rules: [{
              required: true, message: '请输入真实姓名!',
            }],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem className={styles.item}
          {...formItemLayout}
          label="密码"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入密码!',
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem className={styles.item}
          {...formItemLayout}
          label="手机号"
        >
          {getFieldDecorator('tel', {
            rules: [{ required: true, message: '请输入电话号码!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" onClick={handleSubmitRegister} className={styles["register-submit"]} size='large'>注&nbsp;&nbsp;册</Button>
          <Button type="primary" onClick={handleBack} className={styles["back-btn"]} size='large'>返&nbsp;&nbsp;回</Button>
        </FormItem>
      </Form>
    </div>
  )
}
Register.propTypes = {
};

export default connect(({ register }) => ({ register }))(Form.create()(Register))
