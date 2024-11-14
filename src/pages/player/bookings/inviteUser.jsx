import { useState } from "react";
import { Button, Modal, List, Spin } from "antd";
import { useFetchUsers } from "../../../utils/services/userService";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { usePostApplier } from "../../../utils/services/bookingService";

const InviteUsers = ({ enrolledUser }) => {
  const { bookingId } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    data: users,
    isLoading,
    isError,
  } = useFetchUsers(null, null, null, "asc", 1, 10);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const { mutateAsync } = usePostApplier();
  const handleInvite = (user) => {
    mutateAsync({ bookingId: bookingId, userId: user.userId });
  };

  const handleOk = () => {
    // Here you can handle what happens when the modal is confirmed (if needed)
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (isError) {
    return <div>Error</div>;
  }
  const filteredUsers = users
    ? users.result.filter(
        (user) =>
          !enrolledUser.some((enrolled) => enrolled.userId === user.userId)
      )
    : [];
  return (
    <>
      <Button type="dashed" onClick={showModal}>
        Invite +
      </Button>
      <Modal
        open={isModalVisible}
        title="Invite Users"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {isLoading ? (
          <div className="w-full min-h-32 flex items-center justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <List
            bordered
            dataSource={filteredUsers}
            renderItem={(user) => (
              <List.Item
                actions={[
                  <Button
                    key={user.userId}
                    type="primary"
                    onClick={() => handleInvite(user)}
                  >
                    Invite
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <img
                      src={user.avatar}
                      alt={user.userName}
                      style={{ width: 40, borderRadius: "50%" }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/40";
                      }}
                    />
                  }
                  title={user.fullName}
                  description={`Contact: ${user.email}`}
                />
              </List.Item>
            )}
          />
        )}
      </Modal>
    </>
  );
};

InviteUsers.propTypes = {
  enrolledUser: PropTypes.array,
};

export default InviteUsers;
