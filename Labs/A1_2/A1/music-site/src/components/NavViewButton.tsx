import React from "react";
import { useNavigate } from "react-router-dom";

interface NavViewButtonProps {
  serialId: number;
}

const NavViewButton = ({ serialId }: NavViewButtonProps) => {
  const navigate = useNavigate();
  const handleEditClick = (serialId: number) => {
    navigate("/view/" + serialId);
  };
  return (
    <button
      type="button"
      className="btn btn-info"
      onClick={() => handleEditClick(serialId)}
    >
      View music
    </button>
  );
};

export default NavViewButton;
