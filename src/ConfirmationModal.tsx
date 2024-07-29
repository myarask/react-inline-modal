type ConfirmationModalProps = {
  resolve: (value: boolean) => void;
};

export const ConfirmationModal = ({ resolve }: ConfirmationModalProps) => {
  return (
    <dialog open>
      <p>Are you sure you want to delete this user?</p>
      <button onClick={() => resolve(true)}>Yes</button>
      <button onClick={() => resolve(false)}>No</button>
    </dialog>
  );
};
