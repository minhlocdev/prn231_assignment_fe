import {
  CalendarOutlined,
  MoneyCollectOutlined,
  FieldTimeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom"; // Import Link here
import UserDropdown from "./userDropdown";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: "1",
    icon: <CalendarOutlined />,
    label: <Link to={"/player/book-field"}>Book field</Link>,
  },
  {
    key: "g1",
    label: "Activities",
    type: "group",
    children: [
      {
        key: "2",
        icon: <ClockCircleOutlined />,
        label: <Link to={"/player/activities/pending"}>Pending</Link>,
      },
      {
        key: "3",
        icon: <FieldTimeOutlined />,
        label: <Link to={"/player/activities/ongoing"}>Ongoing</Link>,
      },
      {
        key: "4",
        icon: <CheckCircleOutlined />,
        label: <Link to={"/player/activities/done"}>Done</Link>,
      },
    ],
  },
  {
    key: "5",
    icon: <TeamOutlined />,
    label: <Link to={"/player/teams"}>Teams</Link>,
  },
  {
    key: "g2",
    label: "Payments",
    type: "group",
    children: [
      {
        key: "6",
        icon: <MoneyCollectOutlined />,
        label: <Link to={"/player/payments"}>Payments</Link>,
      },
      {
        key: "7",
        icon: <DollarCircleOutlined />,
        label: <Link to={"/player/billings"}>Billings</Link>,
      },
    ],
  },
];

const PlayerLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="flex items-center justify-center h-16 text-2xl font-extrabold text-white">
          <h2>333</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]} // Default selected item
          className="pb-6"
          items={items}
        />
      </Sider>
      <Layout className="min-h-[100vh]">
        <Header
          className="flex justify-between items-center"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <UserDropdown />
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PlayerLayout;
