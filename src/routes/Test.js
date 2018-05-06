import React from 'react';
import { connect } from 'dva';
import { Form, Input, Icon, Button, Switch, InputNumber } from 'antd';
const FormItem = Form.Item;


let uuid = 0;
class Test extends React.Component {
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleSubmit = (e) => {

    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => { // 每个添加条目
      return (
        <div>
          <FormItem
            key = {'1'+ k }
          >
            <span className="ant-form-text">
              打印数量&nbsp;&nbsp;&nbsp;
              {getFieldDecorator(`count[${k}]`,{
                initialValue: 1,
                validateTrigger: ['onChange']
              })(
                <InputNumber  min={1} max={10} style={{width: 80}} defaultValue={1}  />
              )}
            </span>

          </FormItem>
          <FormItem
            key={'2'+k}
          >

              <span>
                黑白/彩色
                {getFieldDecorator(`color[${k}]`, {
                  validateTrigger: ['onChange', 'onBlur'],
                  valuePropName: 'checked',
                  initialValue: false,
                })(
                   <Switch checkedChildren="彩色" unCheckedChildren="黑白" />
                  )}
              </span>


              <span>
                单页/双页
                {getFieldDecorator(`style[${k}]`, {
                  validateTrigger: ['onChange', 'onBlur'],
                  valuePropName: 'checked',
                  initialValue: false,
                })(
                  <Switch checkedChildren="双页" unCheckedChildren="单页" />
                )}
              </span>

          </FormItem>
        </div>
      );
    })
    return (
      <Form onSubmit={this.handleSubmit}>
        {formItems}
        <FormItem>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add field
          </Button>
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    );
  }
}

// export default Products;
export default Form.create()(Test);

