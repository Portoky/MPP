import { createContext } from "react";
import { useState } from "react";
import React from "react";
import { Music } from "../entities/Music";
import { ReactNode } from "react";

interface MusicProviderProps {
  children: ReactNode;
}

const MusicContext = createContext<{
  musics: Music[];
  setMusics: React.Dispatch<React.SetStateAction<Music[]>>;
}>({ musics: [], setMusics: () => {} });

const MusicProvider = ({ children }: MusicProviderProps) => {
  const [musics, setMusics] = useState<Music[]>([]);
  return (
    <MusicContext.Provider value={{ musics, setMusics }}>
      {children} {/*now everything you put here has that context*/}
    </MusicContext.Provider>
  );
};

export { MusicContext, MusicProvider };
