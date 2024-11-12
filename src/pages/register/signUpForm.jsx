import { Button, Form, Input, Radio } from "antd";
import { useSignUp } from "../../utils/services/authService";
import { useTheme } from "../../hooks/useTheme";
import { useForm } from "antd/es/form/Form";

const SignUpForm = () => {
  const [registerForm] = useForm();
  const { theme, toggleTheme } = useTheme();
  const { mutate: signUp, isPending } = useSignUp();
  const onFinish = (values) => {
    console.log("Success:", values);
    const fullname = `${values.firstName} ${values.lastName}`;

    const payload = {
      fullname,
      username: values.username,
      email: values.email,
      password: values.password,
      phoneNumber: values.phone,
      role: values.role,
      taxCode: values.role === "CourtOwner" ? values.taxCode : "",
    };

    signUp(payload);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 10 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <Form
      {...formItemLayout}
      form={registerForm}
      layout="horizontal"
      name="registerForm"
      initialValues={{ remember: true, role: theme }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      disabled={isPending}
    >
      <Form.Item name="role" label="Register as:">
        <Radio.Group onChange={toggleTheme} value={theme}>
          <Radio value="User">User</Radio>
          <Radio value="CourtOwner">Owner</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="First Name"
        name="firstName"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        rules={[{ required: true, message: "Please input your first name!" }]}
      >
        <Input disabled={isPending} />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastName"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        style={{
          display: "inline-block",
          width: "calc(50% - 8px)",
          marginLeft: "8px",
        }}
        rules={[{ required: true, message: "Please input your last name!" }]}
      >
        <Input disabled={isPending} />
      </Form.Item>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input disabled={isPending} />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: "Please input your phone number!" }]}
      >
        <Input disabled={isPending} style={{ width: "100%" }} />
      </Form.Item>
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
      {theme == "owner" && (
        <Form.Item
          name="taxCode"
          label="Tax code"
          rules={[
            { required: true, message: "Please input your tax code!" },
            { type: Number, message: "Invalid tax code!" },
            { max: 6, message: "Invalid tax code!" },
          ]}
        >
          <Input disabled={isPending} style={{ width: "100%" }} />
        </Form.Item>
      )}
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password disabled={isPending} />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        dependencies={["password"]}
        name="confirm"
        rules={[
          { required: true, message: "Please confirm your password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Password do not match!"));
            },
          }),
        ]}
      >
        <Input.Password disabled={isPending} />
      </Form.Item>
      <div className="w-full">
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
            className="w-full"
            disabled={isPending}
          >
            Register
          </Button>
          or <a href="/login">Log In Now!</a>
        </Form.Item>
      </div>
    </Form>
  );
};

export default SignUpForm;
