import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <button onClick={handleGoBack} className="text-blue-500 hover:underline">
      Go Back
    </button>
  );
};

export default BackButton;
