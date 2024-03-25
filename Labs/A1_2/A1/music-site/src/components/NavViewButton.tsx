import React from "react";
import { Music } from "../entities/Music";
import { useNavigate } from "react-router-dom";

interface NavViewButtonProps {
  musics: Music[];
  setMusic: (musics: Music[]) => void;
  serialId: number;
}

const NavViewButton = ({ musics, setMusics, serialId }: NavViewButtonProps) => {
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
