# Write natural flowing code with inline modals

Use modals in flows to match the user's experience.

```ts
const handleClick = async () => {
  // Collect user input asynchronously
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

### Introduce the `InlineModalProvider` to your application

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

### Prepare your specialty modal

```tsx
// Bring your own stylized modal
import { Modal } from "any-component-library";

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

### Use the inline modals in a user flow

```tsx
import { useInlineModal } from "react-inline-modal";

const DangerButton = () => {
  const modal = useInlineModal();

  const handleClick = async () => {
    const confirmation = await modal.show(ConfirmationModal);
    if (!confirmation) return;

    alert("Proceeding...");
  };

  return <button onClick={handleClick}>Do Something Permanent</button>;
};
```
