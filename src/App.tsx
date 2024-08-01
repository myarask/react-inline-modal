import "./App.css";
import { ConfirmationModal } from "./ConfirmationModal";
import { InlineModalProvider, useInlineModal } from "../lib/index";
import { ProplessModal } from "./ProplessModal";

const Test = () => <div />;

function InnerApp() {
  const modal = useInlineModal();

  const handleClick = async () => {
    let x = await modal.show(Test); // TODO: Enforce that Modals have a resolve prop

    x = await modal.show(ProplessModal);

    if (!x) return;

    const confirmation = await modal.show(ConfirmationModal, {
      message: "Are you sure?",
      test: 1, // This should be a type error
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
