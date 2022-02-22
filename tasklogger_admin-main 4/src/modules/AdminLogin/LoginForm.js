import { Form, Input, Button, Checkbox } from 'antd';

const Demo = () => {
  const onFinish = (values) => {
    console.log('Success:', values[0]);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ xs: 24, sm:8, md: 8, lg:32}}
      wrapperCol={{ xs: 24,sm:8, md: 8, lg:32}}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      // onFinish={function () {
      //   alert('Hello');
      //   console.log("aipple is a fruit",arguments);
      // }}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};


export default Demo;