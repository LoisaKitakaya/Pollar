import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("authenticated");

    navigate("/");

    window.location.reload();
  };

  return (
    <div>
      <button
        onClick={() => logOut()}
        className="rounded-md p-3 bg-red-500 mt-0 ml-4 hover:bg-red-600 shadow-md border-black text-white"
      >
        Log out
      </button>
    </div>
  );
};

export default LogOut;
