import { ReactNode } from "react";
import { FaCheck } from "react-icons/fa";
interface Props {
  children: ReactNode;
  onClose: () => void;
  onConfirm: () => void;
}

const Alert = ({ children, onClose, onConfirm }: Props) => {
  return (
    <div className="alert alert-warning alert-dismissible fade show">
      {children}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onClose}
      ></button>
      <button
        style={{
          backgroundColor: "transparent",
          border: "none",
          float: "right",
        }}
        type="button"
        className="btn-bi flex-shrink-0 me-2"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onConfirm}
      >
        <FaCheck />
      </button>
    </div>
  );
};

export default Alert;
