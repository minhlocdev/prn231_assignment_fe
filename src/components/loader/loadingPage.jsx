// LoadingPage.jsx
import { Spin } from "antd"; // Import Ant Design's Spin component

const LoadingPage = () => {
  return (
    <div className="loading-container flex items-center justify-center h-full">
      <Spin size="large" />
    </div>
  );
};

export default LoadingPage;
