import React from 'react';
import fetch from '../utils/fetch';
import { connect } from 'dva';
import { Button, Input, Icon, Form } from 'antd';
import styles from './IndexPage.css';

const FormItem = Form.Item;

// 注册按钮
function handleSubReg() {
  fetch({
    method: 'get',
    url: 'http://localhost/YunPrint/public/user/login/dellogin',
  }).then(res => {
    console.log(res.data)
  })
}

class IndexPage extends React.Component{
   handleSubLogin = (e) => {
     e.preventDefault();
     this.props.form.validateFields((err, values) => {
       if (!err) {
         console.log('Received values of form: ', values);
         fetch({
           method: 'post',
           data: values,
           url: 'http://localhost/YunPrint/public/user/login/oklogin',
         }).then(res => {
           console.log(res.data)
         })
       }
     });

  }
  render(){
    const { getFieldDecorator } = this.props.form;
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
              <Button type="primary" onClick={this.handleSubLogin} className={styles["login-form-button"]}>
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

}
const WrappedNormalLoginForm = Form.create()(IndexPage);
IndexPage.propTypes = {
};

export default connect()(WrappedNormalLoginForm);
