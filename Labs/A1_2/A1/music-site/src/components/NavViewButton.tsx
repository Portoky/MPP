import React from "react";
import { useNavigate } from "react-router-dom";

interface NavViewButtonProps {
  musicId: number;
}

const NavViewButton = ({ musicId }: NavViewButtonProps) => {
  const navigate = useNavigate();
  const handleEditClick = (musicId: number) => {
    navigate("/view/" + musicId);
  };
  return (
    <button
      type="button"
      className="btn btn-info"
      onClick={() => handleEditClick(musicId)}
    >
      View music
    </button>
  );
};

export default NavViewButton;
