/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/5/3
 * Time : 14:36
 * Desc :
 */
import React from 'react'
import { connect } from 'dva'
import { Form, Input, Button, Card  } from 'antd'
import Logo from '../../components/Logo/Logo'
import styles from './EditUser.css'

const FormItem = Form.Item;

const EditUserInfo = ({
  dispatch,
  info,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  const { userinfo } = info;

  function handleSubmitUpdate () {
    // todo 确认修改
    validateFieldsAndScroll((errors,values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'info/updateuserinfo', payload: values })
    })
  }

  function handleReturn() {
    window.history.go(-1)
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
      <Card title="修改个人信息" className={styles.card}>
      <Form className={styles.form}>
        <FormItem
          {...formItemLayout}
          label="用户名"
        >
          {getFieldDecorator('username', {
            rules: [{
              required: true, message: '请输入用户名!',
            }],
            initialValue: userinfo.username
          })(
            <Input type="text"  disabled={true}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="真实姓名"
        >
          {getFieldDecorator('realname', {
            rules: [{
              required: true, message: '请输入真实姓名!',
            }],
            initialValue: userinfo.realname
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入密码!',
            }],
            initialValue: userinfo.password
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="手机号"
        >
          {getFieldDecorator('tel', {
            rules: [{ required: true , message: '请输入电话号码!' }],
            initialValue: userinfo.tel
          })(
            <Input  />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" onClick={handleSubmitUpdate} size='large' className={styles.edit}>修改</Button>
          <Button type="primary" onClick={handleReturn} size='large' className={styles.back}>返回</Button>
        </FormItem>
      </Form>
      </Card>
    </div>
  );
};

// export default Products;
export default connect(({ info }) => ({ info }))(Form.create()(EditUserInfo))
