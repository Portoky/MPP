interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <>
      <button type="button" className="btn btn-danger" onClick={onClick}>
        Delete
      </button>
    </>
  );
};

export default DeleteButton;
