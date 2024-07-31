import "./App.css";
import { ConfirmationModal } from "./ConfirmationModal";
import { InlineModalProvider, useInlineModal } from "../lib/index";

function InnerApp() {
  const modal = useInlineModal();

  const handleClick = async () => {
    const confirmation = await modal.show(ConfirmationModal, {
      message: "Are you sure?",
    });

    if (!confirmation) return;

    alert("Proceeding...");
  };

  return (
    <>
      <button onClick={handleClick}>Start Flow</button>
    </>
  );
}

const App = () => {
  return (
    <InlineModalProvider>
      <InnerApp />
    </InlineModalProvider>
  );
};

export default App;
