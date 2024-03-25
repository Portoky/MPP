import { useNavigate } from "react-router-dom";

const NavAddButton = () => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="btn btn-outline-primary"
      onClick={() => navigate("/pages/addmusic")}
    >
      Add music!
    </button>
  );
};

export default NavAddButton;
