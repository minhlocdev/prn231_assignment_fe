import { useState } from "react";
import { Form, Input, Button, notification, Spin } from "antd";
import dayjs from "dayjs";
import useAuth from "../../../hooks/useAuth";
import AvatarUploader from "../../../components/local/avatarUploader";
import { getUser, putUser } from "../../../utils/services/queries/userQuery";
import { useMutation, useQuery } from "@tanstack/react-query";

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
  const { mutate, isPending } = useMutation({
    mutationKey: ["update-user"],
    mutationFn: putUser,
    onSuccess: () => {
      notification.success({
        message: "Profile Updated",
        description: "Your profile has been updated successfully!",
      });
    },
    onError: (error) => {
      notification.error({
        message: "Error",
        description:
          error.message || "An error occurred while updating the profile.",
      });
    },
  });
  const handleSubmit = async (values) => {
    const email = values.email;
    const updateParam = {
      fullName: values.fullName,
      phoneNumber: values.phoneNumber,
    };

    await mutate({ email, updateParam });
    setIsChanged(false);
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
      >
        <Form.Item label="Avatar">
          <AvatarUploader />
        </Form.Item>

        <Form.Item
          label="Full Name"
          name="fullName"
          initialValue={user?.fullName}
        >
          <Input disabled={isPending} />
        </Form.Item>

        <Form.Item label="Email" name="email" initialValue={user?.email}>
          <Input disabled={true} />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          initialValue={user?.phoneNumber}
        >
          <Input disabled={isPending} />
        </Form.Item>

        <Form.Item label="Date Created">
          <span>{dayjs(user?.dateCreate).format("YYYY-MM-DD HH:mm:ss")}</span>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!isChanged || isPending}
          >
            {isPending ? "Updating..." : "Save Changes"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfilePage;
