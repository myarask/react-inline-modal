import { createContext, useCallback, useContext, useState } from "react";

type ResolveType = (value: unknown) => void;

interface Modal<P> {
  Component: React.ComponentType<P & { resolve: ResolveType }>;
  resolve: ResolveType;
  props?: P | undefined;
}

const InlineModalContext = createContext<{
  show<P>(
    component: React.ComponentType<P & { resolve: ResolveType }>,
    props?: P | undefined
  ): Promise<unknown>;
}>(null!);

/**
 * A provider that allows you to use modals in your app handlers.
 */
export const InlineModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [modals, setModals] = useState<Modal<any>[]>([]);

  const hide = useCallback(() => {
    setModals((prev) => prev.slice(0, -1));
  }, [setModals]);

  const show = useCallback(
    <P,>(
      Component: React.ComponentType<P & { resolve: ResolveType }>,
      props?: P | undefined
    ) => {
      return new Promise((resolve) => {
        const newModal: Modal<P> = {
          Component,
          resolve: (result: unknown) => {
            resolve(result);
            hide();
          },
          props,
        };

        setModals((prev) => [...prev, newModal]);
      });
    },
    [setModals, hide]
  );

  return (
    <InlineModalContext.Provider value={{ show }}>
      {children}
      {modals.map(({ Component, resolve, props }, index) => (
        <Component {...props} key={index} resolve={resolve} />
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
