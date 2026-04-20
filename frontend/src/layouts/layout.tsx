import { ReactNode, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { layoutExcludedPath } from "./layout.data";
import NoLayoutView from "./NoLayout.view";
import HasLayoutView from "./HasLayout.view";
import { LoadingBarRef } from "react-top-loading-bar";

export default function Layout({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const loader = useRef<LoadingBarRef | null>(null);

  // (loader sementara, agak ribet soalnya)
  useEffect(() => {
    setIsLoading(true);
    loader.current?.continuousStart();

    const timer = setTimeout(() => {
      loader.current?.complete();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname]);

  if (layoutExcludedPath.includes(location.pathname)) {
    return (
      <NoLayoutView
        children={children}
        setIsLoading={setIsLoading}
        loader={loader}
        isLoading={isLoading}
      />
    );
  }

  return (
    <HasLayoutView
      children={children}
      setIsLoading={setIsLoading}
      loader={loader}
      isLoading={isLoading}
    />
  );
}
