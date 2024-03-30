import React from "react";
import { useNavigate } from "react-router-dom";
import { Music } from "../entities/Music";
interface NavEditButtonProps {
  serialId: number;
}

const NavEditButton = ({ serialId }: NavEditButtonProps) => {
  const navigate = useNavigate();
  const handleEditClick = (serialId: number) => {
    navigate("/edit/" + serialId);
  };
  return (
    <button
      type="button"
      className="btn btn-warning"
      onClick={() => handleEditClick(serialId)}
    >
      Edit music
    </button>
  );
};

export default NavEditButton;
