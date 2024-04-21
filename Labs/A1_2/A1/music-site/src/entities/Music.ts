import { Artist } from "./Artist";

export enum MusicRating {
  ONESTAR = 1,
  TWOSTAR,
  THREESTAR,
  FOURSTAR,
  FIVESTAR,
}

export interface Music {
  musicId: number;
  title: string;
  artist: Artist;
  rating: MusicRating; //1-5
  yearOfRelease: number;
}
