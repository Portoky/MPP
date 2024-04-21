import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

interface NavButtonProps {
  path: string;
  className: string;
  children: ReactNode;
}

const NavButton = ({ path, className, children }: NavButtonProps) => {
  const navigate = useNavigate();
  return (
    <button type="button" className={className} onClick={() => navigate(path)}>
      {children}
    </button>
  );
};

export default NavButton;
