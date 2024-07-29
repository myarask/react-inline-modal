# Write natural flowing code with inline modals

Replace visibility states with flows that match the user's experience:

```ts
const handleClick = async () => {
  // Allow modals to collect user input asynchronously
  // (Confirmation Modal is a React component)
  const confirmation = await modal.show(ConfirmationModal);

  // Handle logical branches
  if (!confirmation) return;

  // Continue with the happy path
  alert("Proceeding...");
};
```

## Installation

```bash
npm i react-inline-modal
```

## Usage

1. Introduce the `InlineModalProvider` to your application.

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

2. Prepare your specialty modal

```tsx
import { Modal } from "my-component-library";

const ConfirmationModal = ({ resolve }) => {
  return (
    <Modal open>
      <h1>Are you sure?</h1>
      <button onClick={() => resolve(true)}>Yes</button>
      <button onClick={() => resolve(false)}>No</button>
    </Modal>
  );
};
```

3. Use the inline modals in a user flow

```tsx
import { useInlineModal } from "react-inline-modal";

const DangerButton = () => {
  const modal = useInlineModal();

  const handleClick = async () => {
    const confirmation = await modal.show(ConfirmationModal);
    if (!confirmation) return;

    alert("Proceeding...");
  };

  return <button onClick={handleClick}>Do</button>;
};
```
