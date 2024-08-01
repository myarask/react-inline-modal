import { createContext, useCallback, useContext, useState } from "react";

type Resolve = (value: unknown) => void;
type ComponentWithResolveProps<P> = P & { resolve: Resolve };

interface Modal<P> {
  Component: React.ComponentType<P & { resolve: Resolve }>;
  resolve: Resolve;
  props: Omit<ComponentWithResolveProps<P>, "resolve"> | undefined;
}

// Utility type to check if a component uses a prop other than "resolve"
type UsesNoProps<T> = keyof T extends "resolve" ? true : false;

type Show = {
  <P extends object>(
    Component: React.ComponentType<ComponentWithResolveProps<P>>,
    props?: UsesNoProps<P> extends true
      ? never
      : Omit<ComponentWithResolveProps<P>, "resolve">
  ): Promise<unknown>;
};

const InlineModalContext = createContext<{
  show: Show;
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
    <P extends object>(
      Component: React.ComponentType<ComponentWithResolveProps<P>>,
      props?: UsesNoProps<P> extends true
        ? undefined
        : Omit<ComponentWithResolveProps<P>, "resolve">
    ) => {
      return new Promise((resolve) => {
        const newModal: Modal<P> = {
          Component,
          resolve: (result) => {
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
