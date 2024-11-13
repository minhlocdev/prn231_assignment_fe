import { useState } from "react";
import { Form, Input, Button, notification, Spin } from "antd";
import dayjs from "dayjs";
import useAuth from "../../../hooks/useAuth";
import AvatarUploader from "../../../components/local/avatarUploader";
import { getUser } from "../../../utils/services/queries/userQuery";
import { useQuery } from "@tanstack/react-query";

const ProfilePage = () => {
  const { user } = useAuth();
  const { isLoading } = useQuery({
    queryKey: ["user", user?.userId],
    queryFn: () => getUser(user?.userId),
    enabled: !!user?.userId,
  });
  const [form] = Form.useForm();
  const [isChanged, setIsChanged] = useState(false);

  // Handle form changes
  const handleFormChange = () => {
    setIsChanged(true);
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    console.log("Form values:", values);
    notification.success({
      message: "Profile Updated",
      description: "Your profile has been updated successfully!",
    });
    setIsChanged(false); // Reset change state after saving
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-60 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="profile-page">
      <h2>Profile Page</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onValuesChange={handleFormChange}
        initialValues={{
          fullName: user?.fullName,
          email: user?.email,
          phoneNumber: user?.phoneNumber,
        }}
      >
        <Form.Item label="Avatar">
          <AvatarUploader />
        </Form.Item>

        <Form.Item
          label="Full Name"
          name="fullName"
          initialValue={user?.fullName}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email" initialValue={user?.email}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          initialValue={user?.phoneNumber}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Date Created">
          <span>{dayjs(user?.dateCreate).format("YYYY-MM-DD HH:mm:ss")}</span>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={!isChanged}>
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfilePage;
