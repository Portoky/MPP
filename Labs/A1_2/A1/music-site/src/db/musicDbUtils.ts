import { db } from "./db";
import { Music } from "../entities/Music";

export async function addMusic(newMusic: Music) {
  try {
    db.musics.add(newMusic);
  } catch (error) {
    alert("Something went wrong with localdb: " + error);
  }
}

export async function isMusicLocalTableEmpty() {
  try {
    const count = await db.musics.count();
    return count === 0;
  } catch (error) {
    console.error("Error checking if musics table is empty:", error);
    return false;
  }
}

export async function isArtistLocalTableEmpty() {
  try {
    const count = await db.artists.count();
    return count === 0;
  } catch (error) {
    console.error("Error checking if musics table is empty:", error);
    return false;
  }
}
