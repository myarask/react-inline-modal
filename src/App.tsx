import "./App.css";
import { ConfirmationModal } from "./ConfirmationModal";
import { InlineModalProvider, useInlineModal } from "../lib/index";
import { ProplessModal as FuncNoProps } from "./ProplessModal";
import { ClassModalNoProps as ClassNoProps } from "./ClassModalNoProps";
import { ClassModalBad as ClassNoResolve } from "./ClassModalBad";

const NonComponent = 1;
const FuncNoResolve = () => <div />;

function InnerApp() {
  const modal = useInlineModal();

  const handleClick = async () => {
    const a1 = await modal.show(NonComponent); // Expect error
    if (!a1) return;
    const a2 = await modal.show(NonComponent, { test: 1 }); // Expect error
    if (!a2) return;

    const b1 = await modal.show(FuncNoResolve);
    if (!b1) return; // Expect error
    const b2 = await modal.show(FuncNoResolve, { test: 1 }); // Expect error
    if (!b2) return; // Expect error

    const c = await modal.show(FuncNoProps);
    if (!c) return;
    const d = await modal.show(FuncNoProps, { test: 1 }); // Expect error
    if (!d) return;

    const e1 = await modal.show(ClassNoResolve);
    if (!e1) return; // Expect error
    const e2 = await modal.show(ClassNoResolve, { test: 1 }); // Expect error
    if (!e2) return; // Expect error

    const f = await modal.show(ClassNoProps, {
      test: 1, // Should error
      resolve: 1, // Should error
    });
    if (!f) return;

    const g = await modal.show(ClassNoProps);
    if (!g) return;

    const confirmation = await modal.show(ConfirmationModal, {
      message: "Are you sure?",
      // test: 1, // Should error
      // resolve: () => {}, // Should error
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
