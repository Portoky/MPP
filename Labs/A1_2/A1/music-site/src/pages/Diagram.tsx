import React from "react";
import { Music } from "../entities/Music";
import { BarChart } from "@mui/x-charts/BarChart";
import { MusicContext } from "../context/MusicContext";
import { useContext } from "react";

const Diagram = () => {
  const { musics, setMusics } = useContext(MusicContext);

  const arr: number[] = [];
  musics.forEach((music) => {
    arr.push(music.rating);
  });

  let stats: number[] = [0, 0, 0, 0, 0, 0];
  arr.forEach((rating) => {
    stats[rating] += 1;
  });
  stats = stats.slice(1);
  return (
    <>
      <h1>Rating status</h1>
      <BarChart
        series={[{ data: stats }]}
        xAxis={[
          {
            data: ["Star 1", "Star 2", "Star 3", "Star 4", "Star 5"],
            scaleType: "band",
          },
        ]}
        width={500}
        height={300}
      ></BarChart>
    </>
  );
};

export default Diagram;
