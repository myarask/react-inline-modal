type ConfirmationModalProps = {
  resolve: (value: boolean) => void;
  message: string;
};

export const ConfirmationModal = ({
  resolve,
  message,
}: ConfirmationModalProps) => {
  return (
    <dialog open>
      <p>{message}</p>
      <button onClick={() => resolve(true)}>Yes</button>
      <button onClick={() => resolve(false)}>No</button>
    </dialog>
  );
};
