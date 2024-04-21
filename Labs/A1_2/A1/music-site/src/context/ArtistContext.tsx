import { createContext } from "react";
import { useState } from "react";
import React from "react";
import { Artist } from "../entities/Artist";
import { ReactNode } from "react";

interface ArtistProviderProps {
  children: ReactNode;
}

const ArtistContext = createContext<{
  artists: Artist[];
  setArtists: React.Dispatch<React.SetStateAction<Artist[]>>;
}>({ artists: [], setArtists: () => {} });

const ArtistProvider = ({ children }: ArtistProviderProps) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  return (
    <ArtistContext.Provider value={{ artists, setArtists }}>
      {children} {/*now everything you put here has that context*/}
    </ArtistContext.Provider>
  );
};

export { ArtistContext, ArtistProvider };
