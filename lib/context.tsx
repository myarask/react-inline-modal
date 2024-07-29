import { createContext, useCallback, useContext, useState } from "react";

type ResolveType = (value: unknown) => void;
type ComponentType = React.ComponentType<{ resolve: ResolveType }>;

type Modal = {
  Component: ComponentType;
  resolve: ResolveType;
};

const InlineModalContext = createContext<{
  //   hide: () => void;
  show: (Component: ComponentType) => Promise<unknown>;
}>(null!);

/**
 * A provider that allows you to use modals in your app handlers.
 */
export const InlineModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [modals, setModals] = useState<Modal[]>([]);

  const hide = useCallback(() => {
    setModals((prev) => prev.slice(0, -1));
  }, [setModals]);

  const show = useCallback(
    (Component: ComponentType) => {
      return new Promise((resolve) => {
        const newModal = {
          Component,
          resolve: (result: unknown) => {
            resolve(result);
            hide();
          },
        };

        setModals((prev) => [...prev, newModal]);
      });
    },
    [setModals, hide]
  );

  return (
    <InlineModalContext.Provider value={{ show }}>
      {children}
      {modals.map(({ Component, resolve }, index) => (
        <Component key={index} resolve={resolve} />
      ))}
    </InlineModalContext.Provider>
  );
};

export const useInlineModal = () => {
  const context = useContext(InlineModalContext);

  if (!context) {
    throw new Error(
      "useInlineModal must be used within an InlineModalProvider"
    );
  }

  return context;
};
