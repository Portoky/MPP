interface DeleteButtonProps {
  onClick: () => void;
  text: string;
}

const DeleteButton = ({ onClick, text }: DeleteButtonProps) => {
  return (
    <>
      <button type="button" className="btn btn-danger" onClick={onClick}>
        {text}
      </button>
    </>
  );
};

export default DeleteButton;
