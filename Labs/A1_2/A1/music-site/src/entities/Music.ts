export enum MusicRating {
  ONESTAR = 1,
  TWOSTAR,
  THREESTAR,
  FOURSTAR,
  FIVESTAR,
}

export interface Music {
  serialId: number;
  title: string;
  artist: string;
  rating: MusicRating; //1-5
  yearOfRelease: number;
}
