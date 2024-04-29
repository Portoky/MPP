import { createContext } from "react";
import { useState } from "react";
import React from "react";
import { ReactNode } from "react";

interface TrackCountProviderProps {
  children: ReactNode;
}

const TrackCountContext = createContext<{
  trackCountDict: { [key: number]: number };
  setTrackCountDict: React.Dispatch<
    React.SetStateAction<{ [key: number]: number }>
  >;
}>({ trackCountDict: {}, setTrackCountDict: () => {} });

const TrackCountProvider = ({ children }: TrackCountProviderProps) => {
  const [trackCountDict, setTrackCountDict] = useState<{
    [key: number]: number;
  }>({});
  return (
    <TrackCountContext.Provider value={{ trackCountDict, setTrackCountDict }}>
      {children} {/*now everything you put here has that context*/}
    </TrackCountContext.Provider>
  );
};
export { TrackCountContext, TrackCountProvider };
