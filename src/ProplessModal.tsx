type ProplessModalProps = {
  resolve: (value: boolean) => void;
};

export const ProplessModal = ({ resolve }: ProplessModalProps) => {
  return (
    <dialog open>
      <p>No props</p>
      <button onClick={() => resolve(true)}>Yes</button>
      <button onClick={() => resolve(false)}>No</button>
    </dialog>
  );
};
