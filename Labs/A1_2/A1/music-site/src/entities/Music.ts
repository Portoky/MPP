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
  artistName: string;
  rating: MusicRating; //1-5
  yearOfRelease: number;
}
