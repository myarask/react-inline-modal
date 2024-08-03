import { createContext, useCallback, useContext, useState } from "react";

type Resolve = (value: unknown) => void;
type ComponentWithResolveProps<P> = P & { resolve: Resolve };

interface Modal<P> {
  Component: React.ComponentType<P & { resolve: Resolve }>;
  resolve: Resolve;
  props: Omit<ComponentWithResolveProps<P>, "resolve"> | undefined;
}

type FirstArgument<T> = T extends (arg1: infer A, ...args: unknown[]) => unknown
  ? A
  : never;

type ShowReturnType<C> = Promise<
  C extends React.ComponentType<infer P>
    ? P extends { resolve: unknown }
      ? FirstArgument<P["resolve"]>
      : void
    : void
>;

type Show = <C extends React.ComponentType<any>>(
  Component: C,
  props?: C extends React.ComponentType<infer P>
    ? keyof P extends "resolve"
      ? never
      : Omit<P, "resolve">
    : undefined
) => ShowReturnType<C>;

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
  const [modals, setModals] = useState<Modal<any>[]>([]);

  const hide = useCallback(() => {
    setModals((prev) => prev.slice(0, -1));
  }, [setModals]);

  const show = useCallback(
    <P extends object>(
      Component: React.ComponentType<ComponentWithResolveProps<P>>,
      props?: keyof P extends "resolve"
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
    <InlineModalContext.Provider value={{ show: show as Show }}>
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
