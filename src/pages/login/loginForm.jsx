import { Button, Checkbox, Form, Input } from "antd";
import { useLogin } from "../../utils/services/authService";

const LoginForm = () => {
  const { mutate: login, isPending } = useLogin();
  const onFinish = (values) => {
    console.log("Success:", values);
    login({ email: values.email, password: values.password });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      layout="vertical"
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      disabled={isPending}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <Input disabled={isPending} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password disabled={isPending} />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox disabled={isPending}>Remember me</Checkbox>
      </Form.Item>

      <div className="w-full">
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
            className="w-full"
            disabled={isPending}
          >
            Login
          </Button>
          or <a href="/sign-up">Register now!</a>
        </Form.Item>
      </div>
    </Form>
  );
};

export default LoginForm;
