import { useNavigate } from "react-router-dom";

export const BackHomeButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/")}
      className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mb-4'
    >
      Back to Home
    </button>
  );
};
