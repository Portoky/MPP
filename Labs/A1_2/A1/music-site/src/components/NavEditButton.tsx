import React from "react";
import { useNavigate } from "react-router-dom";
interface NavEditButtonProps {
  musicId: number;
}

const NavEditButton = ({ musicId }: NavEditButtonProps) => {
  const navigate = useNavigate();
  const handleEditClick = (musicId: number) => {
    navigate("/edit/" + musicId);
  };
  return (
    <button
      type="button"
      className="btn btn-warning"
      onClick={() => handleEditClick(musicId)}
    >
      Edit music
    </button>
  );
};

export default NavEditButton;
