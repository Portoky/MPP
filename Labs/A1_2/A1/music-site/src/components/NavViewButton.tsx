import React from "react";
import { useNavigate } from "react-router-dom";

interface NavViewButtonProps {
  entityId: number;
}

const NavViewButton = ({ entityId }: NavViewButtonProps) => {
  const navigate = useNavigate();
  const handleEditClick = (entityId: number) => {
    navigate("/view/" + entityId);
  };
  return (
    <button
      type="button"
      className="btn btn-info"
      onClick={() => handleEditClick(entityId)}
    >
      View music
    </button>
  );
};

export default NavViewButton;
