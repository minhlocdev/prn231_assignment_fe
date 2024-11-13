import { Avatar, Dropdown, Space } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import useAuth from "../../hooks/useAuth";

const UserDropdown = () => {
  const { user, logout } = useAuth();
  const items = [
    {
      key: "1",
      label: <a href="/player/profile">Profile</a>,
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: <div onClick={() => logout()}>Log out</div>,
      icon: <LogoutOutlined />,
    },
  ];
  return (
    <>
      <Dropdown
        menu={{
          items,
        }}
      >
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <Space className="pe-6">
            <div className="w-full flex gap-x-3 items-center">
              <Avatar src={user?.avatar} />
              <p>
                Hello, {user?.fullName}
                <span className="down-arrow"> ▼</span>
              </p>
            </div>
          </Space>
        </a>
      </Dropdown>
    </>
  );
};

export default UserDropdown;
