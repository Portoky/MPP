import React from "react";
import { Music } from "../entities/Music";
import { BarChart } from "@mui/x-charts/BarChart";

interface DiagramProps {
  musics: Music[];
  setMusics: (musics: Music[]) => void;
}

const Diagram = ({ musics, setMusics }: DiagramProps) => {
  const arr: number[] = [];
  musics.forEach((music) => {
    arr.push(music.rating);
  });

  let stats: number[] = [0, 0, 0, 0, 0, 0];
  arr.forEach((rating) => {
    stats[rating] += 1;
  });
  stats = stats.slice(1);
  console.log(stats);
  return (
    <>
      <h1>Rating status</h1>
      <BarChart series={[{ data: stats }]} width={500} height={300}></BarChart>
    </>
  );
};

export default Diagram;
