import React from "react";
import { useNavigate } from "react-router-dom";

const NavDiagramButton = () => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="btn btn-outline-info"
      onClick={() => navigate("/pages/diagram")}
    >
      Check Stats!
    </button>
  );
};

export default NavDiagramButton;
