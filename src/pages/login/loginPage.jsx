// LoginPage.jsx
import { Card } from "antd";
import LoginForm from "./loginForm";
import HelmetTitle from "../../components/hoc/helmetTitle";
import { useTheme } from "../../hooks/useTheme";

const LoginPage = () => {
  const { theme } = useTheme();

  const loginBackgrounds = {
    CourtOwner: "/src/assets/login-background.png",
    User: "/src/assets/login-user-background.png",
  };

  const loginImage = {
    CourtOwner:
      "https://images.beta.cosmos.so/f7146287-5115-4b46-8acb-f31b54ef052d?format=jpeg",
    User: "https://images.beta.cosmos.so/caf5aa32-e8db-4c45-b95c-059918e701f3?format=jpeg",
  };

  return (
    <div
      className={`flex justify-center items-center h-screen w-full bg-cover bg-no-repeat transition-all duration-500`}
      style={{ backgroundImage: `url(${loginBackgrounds[theme]})` }}
    >
      <HelmetTitle
        title={`${theme.charAt(0).toUpperCase() + theme.slice(1)} - Login`}
      />
      <div className="flex gap-x-3 items-start w-[70%] h-[calc(100%_-_10rem)] p-3 bg-white rounded-lg shadow-md">
        <div className="hidden md:flex relative flex-col w-1/2 h-full rounded-lg overflow-hidden">
          <img
            src={loginImage[theme]}
            alt="Field image"
            className="object-cover w-full h-full"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h3 className="text-3xl text-white font-extrabold">
              PRN231 - COURT BOOKING
            </h3>
          </div>
        </div>

        <Card className="flex items-center justify-center w-full md:w-1/2 h-full rounded-lg">
          <div className="flex flex-col w-full md:w-80 max-w-sm h-full">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <LoginForm />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
