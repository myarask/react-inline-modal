# React Inline Modal

Use React modals directly in your handlers to align with the user's experience.

```ts
const handleClick = async () => {
  // Collect user input asynchronously
  // (ConfirmationModal is a React component)
  const confirmation = await modal.show(ConfirmationModal, {
    // Pass props to the modal
    message: "Are you sure?",
  });

  // Handle logical branches
  if (!confirmation) return;

  // Continue with the happy path
  alert("Proceeding...");
};
```

## Quick Start

Add the `InlineModalProvider` to your app:

```tsx
import { InlineModalProvider } from "react-inline-modal";

const App = () => {
  return (
    <InlineModalProvider>
      <MyContent />
    </InlineModalProvider>
  );
};
```

Prepare your modal:

```tsx
// Bring your own stylized modal
import { Modal } from "any-component-library";

const ConfirmationModal = ({ resolve, message }) => {
  return (
    <Modal open onClose={() = resolve(false)}>
      <h1>{message}</h1>
      <button onClick={() => resolve(true)}>Yes</button>
      <button onClick={() => resolve(false)}>No</button>
    </Modal>
  );
};
```

Use the modal in a handler:

```tsx
const DeleteButton = () => {
  const modal = useInlineModal();

  const handleClick = async () => {
    const confirmation = await modal.show(ConfirmationModal, {
      message: "Are you sure?",
    });

    if (!confirmation) return;

    alert("Proceeding...");
  };

  return <button onClick={handleClick}>Delete</button>;
};
```
