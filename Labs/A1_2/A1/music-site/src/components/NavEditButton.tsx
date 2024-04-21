import React from "react";
import { useNavigate } from "react-router-dom";
interface NavEditButtonProps {
  entityId: number;
}

const NavEditButton = ({ entityId }: NavEditButtonProps) => {
  const navigate = useNavigate();
  const handleEditClick = (entityId: number) => {
    navigate("/edit/" + entityId);
  };
  return (
    <button
      type="button"
      className="btn btn-warning"
      onClick={() => handleEditClick(entityId)}
    >
      Edit music
    </button>
  );
};

export default NavEditButton;
