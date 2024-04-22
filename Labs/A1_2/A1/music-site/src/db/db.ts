import Dexie, { Table } from "dexie";
import { Music } from "../entities/Music";
import { Artist } from "../entities/Artist";

export class MusicForumDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  musics!: Table<Music>;
  artists!: Table<Artist>;

  constructor() {
    super("MusicForum");
    this.version(2).stores({
      musics: "++musicId, title, musicRating, yearOfRelease", // Primary key and indexed props
      artists: "++artistId, name, biography, musicList",
    });
  }

  async deleteAll() {
    try {
      await this.musics.clear();
      await this.artists.clear();
    } catch (error) {
      console.log("error");
    }
  }
}

export const db = new MusicForumDexie();
