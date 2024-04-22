export enum MusicRating {
  ONESTAR = 1,
  TWOSTAR,
  THREESTAR,
  FOURSTAR,
  FIVESTAR,
}

export interface Music {
  musicId?: number;
  title: string;
  artistId: number;
  rating: MusicRating; //1-5
  yearOfRelease: number;
}
