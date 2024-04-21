/*import { Music } from "../entities/Music";

let guid = 0;
const getAndIncrementGuid = function (): number {
  guid = guid + 1;
  return guid - 1;
};

export const createMusic = (
  title: string,
  artist: string,
  rating: number,
  yearOfRelease: number
): Music => {
  const serialId = getAndIncrementGuid();
  return { serialId, title, artist, rating, yearOfRelease };
};
*/
export const elementsByPage = 5;
