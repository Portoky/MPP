import { createContext } from "react";
import { useState } from "react";
import React from "react";
import { ReactNode } from "react";

interface ConnectionProviderProps {
  children: ReactNode;
}

const ConnectionContext = createContext<{
  isConnection: boolean;
  setIsConnection: React.Dispatch<React.SetStateAction<boolean>>;
}>({ isConnection: true, setIsConnection: () => {} });

const ConnectionProvider = ({ children }: ConnectionProviderProps) => {
  const [isConnection, setIsConnection] = useState<boolean>(true);
  return (
    <ConnectionContext.Provider value={{ isConnection, setIsConnection }}>
      {children} {/*now everything you put here has that context*/}
    </ConnectionContext.Provider>
  );
};
export { ConnectionContext, ConnectionProvider };
