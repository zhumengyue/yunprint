/**
 * Created by WebStorm
 * User : zhumengyue
 * Date : 2018/5/3
 * Time : 14:37
 * Desc :
 */
import React from 'react'
import { connect } from 'dva'
import { Form, Input, Button, Card, Switch  } from 'antd'
import Logo from '../../components/Logo/Logo'
import styles from './EditUser.css'

const FormItem = Form.Item;

const EditShopInfo =
  ({
     dispatch,
     info,
     form: {
       getFieldDecorator,
       validateFieldsAndScroll,
     },
   }) => {
  const { shopinfo } = info;
  function handleSubmitUpdate () {
    // todo 确认修改
    validateFieldsAndScroll((errors,values) => {
      if (errors) {
        return
      }
      let data = values;
      data.status = !values.status ? 1 : 0;
      dispatch({ type: 'info/updateshopinfo', payload: values })
    })
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
      <Card title="修改店铺信息" className={styles.card}>
        <Form className={styles.form}>
          <FormItem
            {...formItemLayout}
            label="用户名"
          >
            {getFieldDecorator('username', {
              rules: [{
                required: true, message: '请输入用户名!',
              }],
              initialValue: shopinfo.username
            })(
              <Input type="text"  disabled={true}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="店铺名称"
          >
            {getFieldDecorator('realname', {
              initialValue: shopinfo.storename
            })(
              <Input type="text" disabled={true}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="商铺地址"
          >
            {getFieldDecorator('place', {
              rules: [{
                required: true, message: '请输入地址!',
              }],
              initialValue: shopinfo.place
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="手机号"
          >
            {getFieldDecorator('tel', {
              rules: [{ required: true , message: '请输入电话号码!' }],
              initialValue: shopinfo.tel
            })(
              <Input  />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="QQ"
          >
            {getFieldDecorator('qq', {
              rules: [{ required: true , message: '请输入QQ号码!' }],
              initialValue: shopinfo.qq
            })(
              <Input  />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="是否正常营业 "
          >
            {getFieldDecorator('status', { valuePropName: 'checked', initialValue: shopinfo.status ? false : true,})(
              <Switch checkedChildren="正常" unCheckedChildren="休息"/>
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" onClick={handleSubmitUpdate} size='large' className={styles.edit}>修改</Button>
            <Button type="primary" onClick={()=>{}} size='large' className={styles.back}>返回</Button>
          </FormItem>
        </Form>
      </Card>
    </div>
  );
};

// export default Products;
export default connect(({ info }) => ({ info }))(Form.create()(EditShopInfo))

