import { Music } from "./Music";

export interface Artist {
  artistId?: number;
  name: string;
  biography: string;
  musicList: Array<Music>;
}
